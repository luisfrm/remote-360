const { verifyJwt, isTokenExpiringSoon, generateJwt } = require('../utils/jwt.js');
const getToken = require('../utils/getToken.js');
const User = require('../models/user.model');

function authMiddleware(allowedRoles = []) {
  return async (req, res, next) => {
    const token = getToken(req);

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      const decoded = verifyJwt(token);
      req.user = decoded;

      // Check if the user has the required role
      if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      // Check if the token is expiring soon
      if (isTokenExpiringSoon(token)) {
        // Refresh the token
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }
        const newToken = generateJwt({ userId: user._id, role: user.role });
        
        // Set the new token in the response header
        res.setHeader('X-New-Token', newToken);
      }

      next();
    } catch (error) {
      console.error('Error in auth middleware:', error);
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
}

module.exports = authMiddleware;