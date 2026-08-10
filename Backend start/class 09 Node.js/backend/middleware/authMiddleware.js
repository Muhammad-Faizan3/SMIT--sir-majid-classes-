const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getDbMode } = require('../config/db');
const { readDB } = require('../config/jsonDB');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (getDbMode() === 'mongodb') {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        const db = readDB();
        const user = db.users.find((u) => u._id === decoded.id);
        if (!user) {
          return res.status(401).json({ message: 'Not authorized, user not found' });
        }
        req.user = { _id: user._id, name: user.name, email: user.email };
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
