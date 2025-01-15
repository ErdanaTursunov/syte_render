require('dotenv').config(); // Подключаем dotenv

// Подключаем необходимые модули
const express = require('express');
const path = require('path');
const router = require('./router');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db');  


const app = express();


app.use(cors());
require('dotenv').config();
app.set('view engine', 'ejs');
app.use(bodyParser.json()); 

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('images'));
app.use('/uploads', express.static('uploads'));


app.use(express.json());

app.use('/', router);


// (async () => {
//   try {
//     console.log("Starting cleanup...");

//     // Отключаем проверки внешних ключей
//     await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });

//     // Получаем все таблицы из базы данных
//     const tables = await sequelize.query(
//       "SELECT table_name FROM information_schema.tables WHERE table_schema = 'Notes_database';", // Укажите имя вашей базы данных
//       { type: sequelize.QueryTypes.SELECT }
//     );

//     // Удаляем каждую таблицу из базы данных
//     for (const table of tables) {
//       const tableName = table.table_name;
//       await sequelize.query(`DROP TABLE IF EXISTS \`${tableName}\`;`, {
//         raw: true,
//       });
//       console.log(`Dropped table: ${tableName}`);
//     }

//     // Включаем проверки внешних ключей обратно
//     await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { raw: true });

//     console.log("All tables in the database have been successfully dropped.");

//     // Синхронизируем базу данных
//     await sequelize.sync({ force: true });
//     console.log("Database synced successfully.");
//   } catch (error) {
//     console.error("Error during database cleanup:", error);
//   }
// })();


// sequelize.sync({ force: true })
//   .then(() => {
//     console.log('Database synced');
//   })
//   .catch((error) => {
//     console.error('Database sync error:', error);
//   });


// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
