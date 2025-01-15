// videoImageUpload.js

const multer = require('multer');

// Настройки для загрузки изображений
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/Acer/Desktop/Сайт для курс/myapp/uploads/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const imageUpload = multer({ storage: imageStorage });

// Настройки для загрузки видео
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/Acer/Desktop/Сайт для курс/myapp/uploads/videos/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const videoUpload = multer({ storage: videoStorage });

module.exports = { imageUpload, videoUpload };
