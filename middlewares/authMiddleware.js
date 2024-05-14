// authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/db');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid or missing token' });
  }

  const tokenString = token.split(' ')[1]; 

  jwt.verify(tokenString, config.secret, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid token', actualError: err.message });
    }
    
    req.user = decoded;
    next();
  });
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ error: 'Forbidden', message: 'Admin access required' });
  next();
};

module.exports = {
  authenticateUser,
  authorizeAdmin,
};
