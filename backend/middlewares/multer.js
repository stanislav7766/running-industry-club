const multer = require('multer');

const uploadImage = multer({
  limits: {
    fileSize: 1024 * 1024,
  },
});
module.exports = () => uploadImage.single('preview');
