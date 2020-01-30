const cloudinary = require('cloudinary').v2;
const fetch = require('node-fetch');
const {
  cloudinaryConfig,
  cloudinaryOptions,
} = require('../../constants/configs');

cloudinary.config(cloudinaryConfig);

const getFolderFetchLink = () =>
  `https://${process.env.CLOUD_API_KEY}:${process.env.CLOUD_API_SECRET}@api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/folders/${process.env.CLOUDINARY_CLOUD_FOLDER}/${folder_name}`;

const uploadPreview = (file, folder) =>
  uploadPreviewHelper(file, folder)
    .then(result => ({
      url: result.url,
      public_id: result.public_id,
    }))
    .catch(err => {
      err.name = uploadPreview.name;
      return err;
    });

const uploadPreviewHelper = (image, folder) =>
  new Promise((resolve, reject) =>
    cloudinary.uploader
      .upload_stream(cloudinaryOptions(folder), (err, res) =>
        err ? reject(err) : resolve(res),
      )
      .end(image.buffer),
  );

const removeFolder = async folder_name =>
  await new Promise((resolve, reject) => {
    cloudinary.api.delete_resources_by_prefix(
      `${process.env.CLOUDINARY_CLOUD_FOLDER}/${folder_name}`,
      error => {
        if (error) {
          error.name = removeFolder.name;
          reject(error);
        }
        fetch(getFolderFetchLink(), {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(res => res.deleted && resolve({success: true}))
          .catch(err => {
            err.name = removeFolder.name;
            reject(err);
          });
      },
    );
  });
const createFolder = async folder_name =>
  await new Promise((resolve, reject) => {
    fetch(getFolderFetchLink(), {
      method: 'POST',
    })
      .then(res => res.json())
      .then(res => res.success && resolve({success: true}))
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
};
