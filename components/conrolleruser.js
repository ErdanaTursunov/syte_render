const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const Tokens = require('../models/tokens'); // Ensure this points to the correct model


const registercontroller = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await Users.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await Users.create({ username, password: hashedPassword, role });

    // Generate a token
    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Store the token
    await Tokens.create({ userId: newUser.id, token });

    // Respond with success
    res.status(201).json({ status: 'success', token });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};


const logincontroller = async (req, res) => {
  const { username, password } = req.body;
  const ipAddress = req.ip;

  if (!username || !password) {
    return res.status(400).json({ status: 'invalid', message: 'Username and password are required' });
  }

  try {
    const user = await Users.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ status: 'invalid', message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status: 'invalid', message: 'Wrong username or password' });
    }

    if (user.lastLoginIp && user.lastLoginIp !== ipAddress) {
      return res.status(403).json({ status: 'invalid', message: 'IP address mismatch' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await Tokens.create({ userId: user.id, token });

    // Сохранить IP-адрес при первом входе
    if (!user.lastLoginIp) {
      user.lastLoginIp = ipAddress;
      await user.save();
    }

    res.status(200).json({ status: 'success', token, role: user.role });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}


const deletecontroller =  async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ status: 'invalid', message: 'User not found' });
    }

    await Tokens.destroy({ where: { userId: id } });
    await Users.destroy({ where: { id } });

    res.status(200).json({ status: 'success', message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

module.exports = { registercontroller, logincontroller, deletecontroller };
