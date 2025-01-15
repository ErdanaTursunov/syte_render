const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Courses = require('./Courses');

const Videos = sequelize.define('videos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filepath: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imagepath: { // Новое поле для пути к изображению
        type: DataTypes.STRING,
        allowNull: false,
    },
    driveFileId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    driveFileUrl: { // Новое поле для ссылки на видео
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    courseId: {
        type: DataTypes.INTEGER,
        references: {
            model: Courses,
            key: 'id',
        },
        allowNull: false,
    },
    uploaded_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    description: {
        type: DataTypes.TEXT // Тип данных может варьироваться в зависимости от вашей конкретной ситуации
    }
}, {
    timestamps: false // Отключение временных меток
});

module.exports = Videos;
