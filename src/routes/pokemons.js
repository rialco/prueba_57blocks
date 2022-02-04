const express = require('express');

const router = express.Router();

const pokemonsController = require('../controllers/pokemons');
const { authenticateToken } = require('../middleware/authorization');

router.get('/', authenticateToken, pokemonsController.getAllPokemons);
router.get('/user/:id', authenticateToken, pokemonsController.getMyPokemons);

router.post('/', authenticateToken, pokemonsController.createPokemon);

router.patch('/:id', authenticateToken, pokemonsController.updatePokemon);

module.exports = router;
