// authController.js
const authService = require('../services/authService');

const authController = {
  register: async (req, res) => {
    try {
      const { user, token } = await authService.register(req.body);
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ errorAt : 'authController.js', error: error });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      res.json({ user, token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const  userId  = req.user.id;
      const updatedProfile = await authService.updateUserProfile(userId, req.body);
      res.json("Your profile has been updated...");
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }, 
  myProfileDetails: async (req, res) => {
    try {
      const  userId  = req.user.id;
      const updatedProfile = await authService.myProfileDetails(userId);
      res.json(updatedProfile);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  },  
  logout: () => {
      localStorage.removeItem('token');
    }
};

module.exports = authController;
