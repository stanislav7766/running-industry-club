const cloudinary = require('cloudinary').v2;
const fetch = require('node-fetch');
const {cloudinaryConfig, cloudinaryFolders, cloudinaryOptions} = require('../../constants/configs');

cloudinary.config(cloudinaryConfig);

const getFolderFetchLink = ({folder_name, type}) =>
  `https://${process.env.CLOUD_API_KEY}:${process.env.CLOUD_API_SECRET}@api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/folders/${cloudinaryFolders[type]}/${folder_name}`;

const uploadPreview = ({file, folder_name, type}) =>
  uploadPreviewHelper({file, folder_name, type})
    .then(result => ({url: result.url, public_id: result.public_id}))
    .catch(err => {
      err.name = uploadPreview.name;
      return err;
    });

const uploadPreviewHelper = ({file, folder_name, type}) =>
  new Promise((resolve, reject) =>
    cloudinary.uploader
      .upload_stream(cloudinaryOptions({folder_name, type}), (err, res) => (err ? reject(err) : resolve(res)))
      .end(file.buffer),
  );

const clearDirectory = async ({folder_name, type}) =>
  await new Promise((resolve, reject) => {
    cloudinary.api.delete_resources_by_prefix(`${cloudinaryFolders[type]}/${folder_name}`, error => {
      if (error) {
        error.name = clearDirectory.name;
        reject(error);
      }
      resolve({success: true});
    });
  });

const isEmptyDirectory = async ({folder_name, type}) =>
  await new Promise((resolve, reject) => {
    cloudinary.api.resources({type: 'upload', prefix: `${cloudinaryFolders[type]}/${folder_name}`}, (error, result) => {
      if (error) {
        error.name = clearDirectory.name;
        reject(error);
      }
      const {resources} = result;
      resolve((Array.isArray(resources) && resources.length) > 0 ? 0 : 1);
    });
  });

const removeFolder = async ({folder_name, type}) =>
  await new Promise(async (resolve, reject) => {
    try {
      await clearDirectory({folder_name, type});
      fetch(getFolderFetchLink({folder_name, type}), {method: 'DELETE'})
        .then(res => res.json())
        .then(res => res && res.deleted && resolve({success: true}))
        .catch(err => {
          err.name = removeFolder.name;
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
const createFolder = async ({folder_name, type}) =>
  await new Promise((resolve, reject) => {
    fetch(getFolderFetchLink({folder_name, type}), {method: 'POST'})
      .then(res => res.json())
      .then(res => res && res.success && resolve({success: true}))
      .catch(err => {
        err.name = createFolder.name;
        reject(err);
      });
  });

const removeImage = publicId =>
  new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (err, res) => {
      if (err) {
        err.name = removeImage.name;
        reject(err);
      } else resolve(res);
    });
  });

module.exports = {
  uploadPreview,
  removeImage,
  removeFolder,
  createFolder,
  isEmptyDirectory,
  clearDirectory,
};
