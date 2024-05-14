const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  photo: String,
  bio: String,
  phone: String,
  isPublic: {
    type: Boolean,
    default: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);
mongoose.connect('mongodb://localhost:27017/Personal-Project-Voosh', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Adjust this value as needed
  socketTimeoutMS: 45000, // Adjust this value as needed
});