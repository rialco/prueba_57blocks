const PokemonRepo = require('../repo/PokemonRepo');
const ApiError = require('../utils/ApiError');
const PokemonSerializer = require('../serializers/PokemonSerializer');

const { validateUser } = require('./utils/validator');

const createPokemon = async (req, res, next) => {
  try {
    const requestingUser = req.userSession;
    const { name, isPublic } = req.body;

    if (!name || !isPublic) {
      throw new ApiError('Not a valid request, send the complete Pokemon info.', 400);
    }

    const pokemon = await PokemonRepo.create(requestingUser.sub, name, isPublic);

    res.json(new PokemonSerializer(pokemon));
  } catch (err) {
    next(err);
  }
};

/*
  Get user's information given its ID
*/
const getAllPokemons = async (req, res, next) => {
  try {
    const pokemons = await PokemonRepo.findAll();

    if (pokemons.length === 0) throw new ApiError('No pokemons found', 400);

    res.json(new PokemonSerializer(pokemons));
  } catch (err) {
    next(err);
  }
};

const getMyPokemons = async (req, res, next) => {
  try {
    const requestingUser = req.userSession;
    const userID = req.params.id;

    if (!validateUser(requestingUser.sub, userID)) throw new ApiError("You are not allowed to view other people's pokemon", 401);

    const pokemons = await PokemonRepo.findByUserID(userID);

    if (pokemons.length === 0) throw new ApiError('No pokemons found', 400);

    res.json(new PokemonSerializer(pokemons));
  } catch (err) {
    next(err);
  }
};

/*
  Update user's values through PATCH conventions
  following RFC 6902 standards (Given an operation, value and path)
*/
const updatePokemon = async (req, res, next) => {
  try {
    const requestingUser = req.userSession;
    const { op, value, path } = req.body;
    if (
      op === undefined
        || op !== 'replace'
        || path === undefined
        || value === undefined
    ) {
      throw new ApiError('Not a valid update', 400);
    }

    const cleanPath = path.replace('/', '');
    if (cleanPath !== 'name' && cleanPath !== 'public') {
      throw new ApiError('Not a valid path', 400);
    }

    const pokemon = await PokemonRepo.findByID(req.params.id);

    if (!pokemon) throw new ApiError('Pokemon not found', 400);

    if (requestingUser.sub !== pokemon.user_id) throw new ApiError('This is not your pokemon', 401);

    const updatedPokemon = await PokemonRepo.update(req.params.id, value, cleanPath);

    res.json(new PokemonSerializer(updatedPokemon));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPokemon,
  getAllPokemons,
  getMyPokemons,
  updatePokemon,
};
