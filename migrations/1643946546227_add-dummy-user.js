/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    INSERT INTO users (name, email, password) VALUES ('test', 'test@test.com', 'test123');
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DELETE FROM users WHERE email = 'test@test.com';
  `);
};
