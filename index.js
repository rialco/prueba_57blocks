const server = require('./src/server');
const pool = require('./pool');

const PORT = process.env.PORT || 3000;

const connectionString = process.env.DATABASE_URL;

pool
  .connect({
    connectionString,
  })
  .then(async () => {
    server().listen(PORT, () => {
      console.log(`User API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
