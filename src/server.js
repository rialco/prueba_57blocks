const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');

const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const pokemonRoutes = require('./routes/pokemons');
const ErrorSerializer = require('./serializers/ErrorSerializer');
const ApiError = require('./utils/ApiError');

// Initialize dotenv configuration to accept environment variables from .env file
dotenv.config();

const server = express();

// Sets the CORS options
// 1. Enable the use of credentials/authorization in the Header
// 2. Sets from which endpoints the request can be made
const corsOptions = {
  credentials: true,
  origin: process.env.INCOMING_URL || '*',
};

// Sets some HTTP headers to help secure the server
server.use(helmet());

// Enable cors on every request
server.use(cors(corsOptions));

// Correctly parse the request in the body
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

// Pass the users routes
server.use('/users', usersRoutes);
// Pass the auth routes
server.use('/auth', authRoutes);
// Pass the pokemon routes
server.use('/pokemons', pokemonRoutes);

// Catch not defined routes
server.use((req, res, next) => {
  res.status(404).json(new ErrorSerializer('Not found'));
});

// Catch server related errors
server.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    const { statusCode, message } = err;
    res.status(statusCode).json(new ErrorSerializer(message));
    return;
  }
  console.log(err);
  res.status(500).json('something went wrong');
});

module.exports = () => server;
