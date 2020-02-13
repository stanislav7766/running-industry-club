const cloudinaryConfig = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
};

const cloudinaryFolders = {
  AVATAR: process.env.CLOUDINARY_CLOUD_FOLDER_AVATAR,
  PREVIEW: process.env.CLOUDINARY_CLOUD_FOLDER_PREVIEW,
};

const cloudinaryOptions = ({folder_name, type}) => ({
  resource_type: 'image',
  folder: `${cloudinaryFolders[type]}/${folder_name}`,
  format: 'jpg',
  // async: true //if async - true, image will be loaded but status - pending and cant get url, only public_id
});

module.exports = {
  cloudinaryConfig,
  cloudinaryFolders,
  cloudinaryOptions,
};
