const cloudinaryConfig = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
};

const cloudinaryOptions = folder => ({
  resource_type: 'image',
  folder: `${process.env.CLOUDINARY_CLOUD_FOLDER}/${folder}`,
  format: 'jpg',
  // async: true //if async - true, image will be loaded but status - pending and cant get url, only public_id
});

module.exports = {
  cloudinaryConfig,
  cloudinaryOptions,
};
