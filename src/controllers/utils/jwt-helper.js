const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const pathToAccess = path.join(__dirname, '../../../keys/access_rsa_priv.pem');

const ACCESS_PRIV_KEY = fs.readFileSync(pathToAccess, 'utf8');

const generateTokens = (id, _name, _email) => {
  // const accessExpiresIn = 120000; // 2 minutes
  const accessExpiresIn = 60 * 20 * 1000; // 20 minutes

  const payload = {
    sub: id,
    iat: Date.now(),
    name: _name,
    email: _email,
  };

  const signedAccess = jwt.sign(payload, ACCESS_PRIV_KEY, { expiresIn: accessExpiresIn, algorithm: 'RS256' });

  return { accessToken: signedAccess };
};

module.exports = {
  generateTokens,
};
