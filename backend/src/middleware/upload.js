const multer = require('multer');
const createCloudinaryStorage = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const createError = require('../utils/ApiError');

const storage = createCloudinaryStorage({
  cloudinary,
  params: {
    folder: 'rushkey/properties',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }],
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(createError('Only image files are allowed (jpg, jpeg, png, webp, gif).', 400), false);
  }
};

const uploadImages = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10,
  },
}).array('images', 10);

module.exports = { uploadImages };