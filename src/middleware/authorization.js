const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const ApiError = require('../utils/ApiError');
const UserRepo = require('../repo/UserRepo');

const authenticateToken = async (req, res, next) => {
  const pathToAccess = path.join(__dirname, '../../keys/access_rsa_pub.pem');
  const ACCESS_PUB_KEY = fs.readFileSync(pathToAccess, 'utf8');

  // Get the whole authorization header
  const authHeader = req.headers.authorization;

  // Check if the Authorization header contains values AND
  // extract the actual JWT from the header
  const token = authHeader && authHeader.split(' ')[1];

  try {
    if (token == null) throw new ApiError('You are not authorized. Try to login.', 401);

    const decoded = jwt.verify(token, ACCESS_PUB_KEY);

    if (decoded.exp < Date.now()) throw new ApiError('Token expired. Try to login', 401);

    const user = await UserRepo.findByID(decoded.sub);

    if (user.role !== decoded.role) throw new ApiError('Not a valid session, try to login again.', 401);

    req.userSession = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new ApiError('Not valid token', 403));
      return;
    }
    next(error);
  }
};

module.exports = { authenticateToken };
