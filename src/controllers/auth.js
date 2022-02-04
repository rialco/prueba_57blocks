const bcrypt = require('bcrypt');

const UserRepo = require('../repo/UserRepo');
const ApiError = require('../utils/ApiError');
const TokenSerializer = require('../serializers/TokenSerializer');

const { generateTokens } = require('./utils/jwt-helper');
const {
  emailValidator, nameValidator, passwordValidator,
} = require('./utils/validator');

/*
  Check if user's exists and then validate if the
  password passed through the request is the correct password using bcrypt
*/
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserRepo.findByEmail(email);

    if (!emailValidator(email)) throw new ApiError('Not a valid email address', 400);

    if (!passwordValidator(password)) throw new ApiError('Not a valid password', 400);

    if (!user) throw new ApiError('No user was found with that email.', 400);

    if (await bcrypt.compare(password, user.password) === false) throw new ApiError('Incorrect password', 400);

    const tokens = generateTokens(user.id, user.name, user.email);

    res.json(new TokenSerializer(tokens));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
