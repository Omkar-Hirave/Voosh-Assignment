// profileController.js
const profileService = require('../services/profileService');

const profileController = {
  getProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const userProfile = await profileService.getUserProfile(userId);
      res.json(userProfile);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  },
  listProfiles: async (req, res) => {
    try {
      const  userId  = req.user.id;
      const seeUser = req.params.userId;
      const publicProfiles = await profileService.listProfiles(userId , seeUser);
      if(!publicProfiles){
        res.json("User not found or profile is not public")
      }else{
        res.json(publicProfiles);
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};

module.exports = profileController;
