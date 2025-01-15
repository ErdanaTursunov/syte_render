const express = require('express');
const multer = require('multer');
const path = require('path');

const { authenticatesToken, authorizesRole } = require('./midleware/auth');
const { authenticateToken, authorizeRole } = require('./midleware/middleware');
const { registercontroller, logincontroller, deletecontroller } = require('./components/conrolleruser');
const {  videosidcontroller, uploadcontroller, videocontroller } = require('./components/videoscontroller');
const Courses = require('./models/Courses');
const Videos = require('./models/videos');
const { uploadController, getVideoUrlController } = require('./components/Videooo');
const { coursescontroller } = require('./components/coursescontroller');
const Users = require('./models/users');


const TelegramBot = require('node-telegram-bot-api');
const { log } = require('console');

// Токен вашего бота, который вы получили от @BotFather
const botToken = '7401546369:AAF3gBZXrgo_23iKLU90IoHpWFH4hHAZTKc';

// Создание бота с использованием токена
const bot = new TelegramBot(botToken, { polling: false });



const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/'); // Путь для сохранения загруженных изображений
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Переименование файла для предотвращения конфликтов имен
  }
});


const images = multer({ storage: storage });



// Настройка Multer для загрузки файлов
const upload = multer({
  storage: multer.diskStorage({
      destination: function (req, file, cb) {
          // Определяем папку для сохранения файлов в зависимости от их типа
          if (file.fieldname === 'file') {
              cb(null, 'uploads/'); // Для видео сохраняем в папку uploads/
          } else if (file.fieldname === 'image') {
              cb(null, 'uploads/images/'); // Для изображений сохраняем в папку uploads/images/
          } else {
              cb(new Error('Invalid fieldname')); // Ошибка, если поле неправильное
          }
      },
      filename: function (req, file, cb) {
          cb(null, file.originalname); // Используем оригинальное имя файла
      }
  })
});




// router.post('/upload',  authenticatesToken, authorizesRole('admin'), upload.single('file'), uploadcontroller);

// Маршрут для получения списка всех видео
router.get('/videos', videocontroller);

// Маршрут для получения содержимого видеофайла по ID видео
router.get('/videos/:id', videosidcontroller);


// Регистрация пользователя
router.post('/register', registercontroller);

// Вход пользователя
router.post('/users/login', logincontroller);

// Удаление пользователя (только администратор)
router.delete('/users/:id', authenticateToken, authorizeRole('admin'), deletecontroller);




// Роут для загрузки видео
router.post('/course/upload', authenticatesToken, authorizesRole('admin'), upload.fields([{ name: 'file' }, { name: 'image' }]), uploadController);

// // Роут для получения всех видео
// router.get('/i', videocontrollerrr);

// // Роут для получения видео по ID курса
// router.get('/i/course/:courseId', videosByCourseControllerrr);


router.get('/videos/:id/url', getVideoUrlController);


router.get('/courses', async (req, res) => {
  try {
    const courses = await Courses.findAll();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Courses.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});


router.get('/course/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const videos = await Videos.findAll({ where: { courseId } });
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos for course:', error);
    res.status(500).json({ error: 'Failed to fetch videos for course' });
  }
});

router.post('/courses/upload',authenticatesToken, authorizesRole('admin'), images.single('image'), coursescontroller);

router.delete('/videos/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Videos.findOne({ where: { id } });
    if (!video) {
      return res.status(404).json({ status: 'invalid', message: 'Videos not found' });
    }

    
    await Videos.destroy({ where: { id } });

    res.status(200).json({ status: 'success', message: 'Videos deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

router.delete('/course/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Courses.findOne({ where: { id } });
    if (!video) {
      return res.status(404).json({ status: 'invalid', message: 'Videos not found' });
    }

    
    await Courses.destroy({ where: { id } });

    res.status(200).json({ status: 'success', message: 'Videos deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});


router.get('/users', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    // Получаем всех пользователей из базы данных
    const users = await Users.findAll({
      attributes: ['id', 'username',  'role'] // Выбираем только нужные атрибуты (логин, пароль, роль)
    });
    res.json(users); // Отправляем список пользователей в формате JSON
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' }); // Отправляем сообщение об ошибке в случае неудачи
  }
});


router.post('/contact', authenticatesToken, async (req, res) => {
	try {
			// Получаем данные из тела запроса
			const { name, email, number, msg } = req.body;

			// Отправляем данные в Телеграм
			await sendToTelegram(name, email, number, msg);

			console.log(name, email, number, msg)

			// Отправляем ответ клиенту
			res.status(200).json({ message: 'Сообщение успешно отправлено!' });
	} catch (error) {
			console.error(error);
			// Отправляем клиенту сообщение об ошибке
			res.status(500).json({ message: 'Ошибка при отправке сообщения.' });
	}
});

	// Функция для отправки данных формы в Телеграм
const sendToTelegram = async (name, email, number, msg) => {
	try {
			const message = `
					Новое сообщение от контактной формы:
					Имя: ${name}
					Email: ${email}
					Номер телефона: ${number}
					Сообщение: ${msg}
			`;

			// Отправка сообщения в Телеграм
			await bot.sendMessage('-4242524378', message);
			console.log('Сообщение успешно отправлено в Телеграм.');
	} catch (error) {
			console.error('Ошибка при отправке сообщения в Телеграм:', error);
	}
};




module.exports = router;
