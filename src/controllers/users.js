const bcrypt = require('bcrypt');

const ApiError = require('../utils/ApiError');
const UserSerializer = require('../serializers/UserSerializer');

const UserRepo = require('../repo/UserRepo');
const {
  emailValidator, nameValidator, passwordValidator,
} = require('./utils/validator');

/*
  Validates user's request body in order to create it in database
*/
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate no null values in request.
    if (name == null || email == null || password == null) {
      throw new ApiError('No null values accepted', 400);
    }

    // Validate no undefined values in request.
    if (name === undefined || email === undefined || password === undefined) {
      throw new ApiError('Payload must contain name, email and password', 400);
    }

    // Validate the distinct user's values passed
    // through the request body
    if (!emailValidator(email)) throw new ApiError('Not a valid email', 400);

    if (!nameValidator(name)) throw new ApiError('Names must not exceed 12 character limit.', 400);

    if (!passwordValidator(password)) throw new ApiError('Not a valid password. Use 1 uppercase letter, 1 lowercase, 1 number, at least 1 special character and at least 10 characters long.', 400);

    // Hash user's password before saving it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const check = await UserRepo.findByEmail(email);

    if (check) throw new ApiError('User already exists', 400);

    // Try to save user in the database
    const user = await UserRepo.insert(name, email, hashedPassword);

    res.json(new UserSerializer(user));
  } catch (err) {
    if (err.code === '23505') {
      next(new ApiError('User already registered', 400));
      return;
    }
    if (err.code === '23502') {
      next(new ApiError('Null values not allowed', 400));
      return;
    }
    next(err);
  }
};

module.exports = {
  createUser,
};
