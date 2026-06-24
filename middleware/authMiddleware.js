import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  // 1. Check if a secure Web App Login Token is present in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Attach the authenticated web user to the request object
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      console.log('🔒 Web token expired or invalid. Checking fallback rules...');
      return res.status(401).json({ message: 'Session expired, please log in again.' });
    }
  }

  // 2. Mobile App / Postman Fallback: Find the first available user in your collection
  try {
    const fallbackUser = await User.findOne();
    if (fallbackUser) {
      req.user = fallbackUser; // Seamlessly attach the real user record
      return next();
    } else {
      return res.status(401).json({ 
        message: 'Authentication failed: No user accounts exist. Please register an account on the web app first.' 
      });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Internal server authentication error' });
  }
};