const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

const adminAuth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'your_jwt_secret');
    
    if (decoded.role !== 'admin') {
      throw new Error();
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Admin access required' });
  }
};

module.exports = { auth, adminAuth }; 