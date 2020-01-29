const multer = require('multer');
const {multerConfig} = require('../constants/configs');

const uploadImage = multer(multerConfig);

module.exports = () => uploadImage.single('preview');
