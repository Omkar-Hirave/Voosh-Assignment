// app.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/profile', authMiddleware.authenticateUser, profileRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
