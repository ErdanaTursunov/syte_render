const jwt = require('jsonwebtoken');
const Users = require('../models/users');


const authenticatesToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    try {
      const foundUser = await Users.findOne({ where: { id: user.userId } });
      if (!foundUser) return res.status(404).json({ message: 'User not found' });

      req.user = foundUser;
      next();

    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
};

const authorizesRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = { authenticatesToken, authorizesRole };
