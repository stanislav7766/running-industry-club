const {cloudinaryConfig, cloudinaryFolders, cloudinaryOptions} = require('./cloudinary');
const {jwtConfig, jwtOptions} = require('./jwt');
const {multerConfig} = require('./multer');
const {mongooseConfig} = require('./mongoose');

module.exports = {
  jwtConfig,
  jwtOptions,
  multerConfig,
  mongooseConfig,
  cloudinaryConfig,
  cloudinaryFolders,
  cloudinaryOptions,
};
