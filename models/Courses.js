const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Courses = sequelize.define('courses', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maxDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  timestamps: false // Отключение временных меток
});

module.exports = Courses;
