const Videos = require("../models/videos");
const { google } = require('googleapis');
const fs = require('fs');
const apikeys = require('../apikeys.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];

// =============================================================================
// Авторизация Google API
const authorize = async () => {
  const jwtClient = new google.auth.JWT(
      apikeys.client_email,
      null,
      apikeys.private_key,
      SCOPE
  );
  await jwtClient.authorize();
  return jwtClient;
};

// Функция для получения содержимого файла из Google Drive
const getFileContent = async (authClient, fileId) => {
  return new Promise((resolve, reject) => {
      const drive = google.drive({ version: 'v3', auth: authClient });
      drive.files.get({ fileId: fileId, alt: 'media' }, { responseType: 'stream' }, (err, res) => {
          if (err) {
              return reject(err);
          }
          resolve(res.data);
      });
  });
};

// Функция для загрузки файла на Google Drive и создания публичной ссылки
const uploadFile = async (authClient, filePath, fileName) => {
  return new Promise((resolve, reject) => {
      const drive = google.drive({ version: 'v3', auth: authClient });
      const fileMetaData = {
          name: fileName,
          parents: ['1UOJNnRov3bLOLkUVcIjjaT_VAJe640Ww'] // ID папки, в которую будет загружен файл
      };
      const media = {
          mimeType: 'application/octet-stream',
          body: fs.createReadStream(filePath)
      };
      drive.files.create({
          resource: fileMetaData,
          media: media,
          fields: 'id'
      }, (error, file) => {
          if (error) {
              return reject(error);
          }
          const fileId = file.data.id;
          drive.permissions.create({
              fileId: fileId,
              requestBody: {
                  role: 'reader',
                  type: 'anyone'
              }
          }, (err, res) => {
              if (err) {
                  return reject(err);
              }
              const fileUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
              resolve({ id: fileId, url: fileUrl });
          });
      });
  });
};

const uploadController = async (req, res) => {
  try {
      const { title, courseId, description } = req.body;
      const videoFile = req.files['file']; // Загрузка видео файла
      const imageFile = req.files['image']; // Загрузка изображения файла

      // Проверка наличия обоих файлов
      if (!videoFile || !imageFile) {
          return res.status(400).json({ error: 'Both video and image files are required' });
      }

      const authClient = await authorize();
      
      // Загрузка видео на Google Drive и сохранение его метаданных в базе данных
      const driveVideoFile = await uploadFile(authClient, videoFile[0].path, videoFile[0].originalname);

      // Сохранение пути к изображению в папке uploads
      const imagePath = `/uploads/images/${imageFile[0].filename}`;

      // Создание записи в базе данных
      const video = await Videos.create({
          filename: videoFile[0].originalname,
          filepath: videoFile[0].path,
          driveFileId: driveVideoFile.id,
          driveFileUrl: driveVideoFile.url,
          title: title,
          courseId: courseId,
          uploaded_at: new Date(),
          description: description,
          imagepath: imagePath // Сохраняем путь к изображению
      });

      res.status(200).json({ message: 'Files uploaded successfully', video });
  } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Failed to upload files' });
  }
};



// Контроллер для получения всех видео
const videocontrollerrr = async (req, res) => {
  try {
      const videos = await Videos.findAll();
      res.json(videos);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch videos' });
  }
};

// Контроллер для получения видео по ID курса
const videosByCourseControllerrr = async (req, res) => {
  try {
      const courseId = req.params.courseId;
      const videos = await Videos.findAll({ where: { courseId: courseId } });
      res.status(200).json(videos);
  } catch (error) {
      console.error('Error fetching videos for course:', error);
      res.status(500).json({ error: 'Failed to fetch videos for course' });
  }
};

const getVideoUrlController = async (req, res) => {
  try {
      const video = await Videos.findByPk(req.params.id);
      if (!video) {
          return res.status(404).json({ error: 'Video not found' });
      }
      res.json(video); // Возвращаем все данные о видео
  } catch (error) {
      console.error('Error fetching video info:', error);
      res.status(500).json({ error: 'Failed to fetch video info' });
  }
};

module.exports = { getVideoUrlController, uploadController, videocontrollerrr, videosByCourseControllerrr };
