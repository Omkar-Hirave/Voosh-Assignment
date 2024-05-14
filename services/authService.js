// authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/db');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, config.secret, { expiresIn: '1h' });
};

const authService = {
  register: async (userData) => {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({ ...userData, password: hashedPassword });
      await user.save();
      const token = generateToken(user);
      return { user, token };
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error('Invalid password');

      const token = generateToken(user);
      return { user, token };
    } catch (error) {
      throw error;
    }
  },
  updateUserProfile: async (userId, newData) => {
    try {
      const user = await User.findByIdAndUpdate(userId, newData, { new: true });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw error;
    }
  },
  myProfileDetails: async (userId) => {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw error;
    }
  },
};



module.exports = authService;
