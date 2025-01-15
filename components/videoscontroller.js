const Videos = require("../models/videos");
const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config();

// const apikeys = require('../apikeys.json');


// =============================================================================

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

const videocontroller = async (req, res) => {
  try {
      const videos = await Videos.findAll();
      res.json(videos);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch videos' });
  }
};

// =============================================================================

const videosidcontroller = async (req, res) => {
  try {
      const video = await Videos.findByPk(req.params.id);
      if (!video) {
          return res.status(404).json({ error: 'Video not found' });
      }
      
      const authClient = await authorize();
      const fileStream = await getFileContent(authClient, video.driveFileId);

      res.setHeader('Content-Type', 'video/mp4');
      fileStream.pipe(res);
  } catch (error) {
      console.error('Error fetching file content:', error);
      res.status(500).json({ error: 'Failed to fetch file content' });
  }
};

// =============================================================================================

// Обновленный код с использованием переменных окружения

const authorize = async () => {
  const jwtClient = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/drive']
  );
  
  await jwtClient.authorize();
  console.log('Successfully authorized');
  return jwtClient;
};



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
          resolve(file.data); // исправлено: возвращаем file.data
      });
  });
};

const uploadcontroller = async (req, res) => {
  try {
    const { title, courseId, description, maxdescription} = req.body; // Добавляем получение названия и ID курса из запроса
    const file = req.file;
    const authClient = await authorize();
    const driveFile = await uploadFile(authClient, file.path, file.originalname);

    const video = await Videos.create({
      filename: file.originalname,
      filepath: file.path,
      driveFileId: driveFile.id,
      title: title, // Название видео из запроса
      courseId: courseId, // ID курса из запроса
      uploaded_at: new Date(),
      description: description,
      maxdescription:maxdescription,
    });

    res.status(200).json({ message: 'File uploaded successfully', video });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};



module.exports = { videosidcontroller, videocontroller, uploadcontroller };