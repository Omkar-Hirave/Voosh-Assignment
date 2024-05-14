// profileService.js
const User = require('../models/user');

const profileService = {
  getUserProfile: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw error;
    }
  },
  listProfiles: async (userId , seeUser) => {
    try {
      let publicUsers;
      
      const checkUserType = await User.findById({_id : userId});
      if (checkUserType.isAdmin) {
        publicUsers = await User.findById({_id : seeUser});
        return publicUsers;
      } else {
        publicUsers = await User.findOne({_id : seeUser, isPublic: true });
        return publicUsers;
      }  
    } catch (error) {
      console.log("The error is ---> ",error);
      throw error;
    }
  },  
};

module.exports = profileService;
