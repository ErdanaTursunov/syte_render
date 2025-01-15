const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Users = require('./users');


const Tokens = sequelize.define('Tokens', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
    }
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false,
});

module.exports = Tokens;
