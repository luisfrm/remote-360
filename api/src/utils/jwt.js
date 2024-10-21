const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_JWT, TIME_TOKEN_EXPIRATION } = require('../config');

function generateJwt(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload must be a non-empty object');
  }

  try {
    const token = jwt.sign(payload, TOKEN_SECRET_JWT, {
      expiresIn: TIME_TOKEN_EXPIRATION
    });
    return token;
  } catch (error) {
    console.error('Error generating JWT:', error);
    throw new Error('Failed to generate JWT');
  }
}

function verifyJwt(token) {
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET_JWT);
    return decoded;
  } catch (error) {
    console.error('Error verifying JWT:', error);
    throw new Error('Invalid token');
  }
}

function isTokenExpiringSoon(token, thresholdMinutes = 5) {
  try {
    const decoded = jwt.decode(token);
    if (!decoded.exp) {
      return true; // If there's no expiration, assume it's expiring soon
    }
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    return timeUntilExpiration < thresholdMinutes * 60 * 1000;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Assume it's expiring soon if there's an error
  }
}

module.exports = {
  generateJwt,
  verifyJwt,
  isTokenExpiringSoon
};