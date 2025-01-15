const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Videos = require('./videos');


const Images = sequelize.define('images', {
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
  driveFileId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  driveFileUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  videoId: {
    type: DataTypes.INTEGER,
    references: {
      model: Videos,
      key: 'id',
    },
    allowNull: false,
  },
  uploaded_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Images;
