/**
* @param {string} email - User's email
*
* Check if the user's provided email is a valid email
*/
const emailValidator = (email) => {
  const reg = /^([a-z\d]+[.\-_]?[a-z\d]+)@([a-z]+)\.([a-z]+)$/i;

  const valid = reg.test(email);

  return valid;
};

/**
* @param {string} name - User's name
*
* Check if the user's provided name is a valid name
*/
const nameValidator = (name) => {
  const reg = /^([a-z]{2,12})$/i;

  const valid = reg.test(name);

  return valid;
};

/**
* @param {string} pass - User's pasword not hashed
*
* Check if the user's password is a valid password.
* It will validate if it has at least 1 lowercase and uppercase letters,
* 1 number and 1 special character. It will also check if it has at least 10 characters
*/
const passwordValidator = (pass) => {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#?\]])[a-zA-Z\d!@#?\]]{10,}$/;

  const valid = reg.test(pass);

  return valid;
};

/**
* @param {string} source - User making the request
* @param {string} destiny - User ID that the request is referring
*
* Check if the user making the request is the same user that the request is referring,
* it will return true if it is the same user
* it will return false if it is NOT the same user
*/
const validateUser = (source, destiny) => {
  const requestingUser = source;
  const userID = destiny;

  if (userID !== requestingUser) {
    return false;
  }
  return true;
};

module.exports = {
  emailValidator,
  nameValidator,
  passwordValidator,
  validateUser,
};
