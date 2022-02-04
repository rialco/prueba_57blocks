const pgFormat = require('pg-format');

const pool = require('../../pool');

class PokemonRepo {
  static async create(userID, name, isPublic) {
    const { rows } = await pool.query('INSERT INTO pokemons (user_id, name, public) VALUES ($1,$2,$3) RETURNING *;', [userID, name, isPublic]);

    return rows[0];
  }

  static async findByID(pokemonID) {
    const { rows } = await pool.query('SELECT * FROM pokemons WHERE id = $1;', [pokemonID]);

    return rows[0];
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM pokemons WHERE public = TRUE;');

    return rows;
  }

  static async findByUserID(userID) {
    const { rows } = await pool.query('SELECT * FROM pokemons WHERE user_id = $1;', [userID]);

    return rows;
  }

  static async update(id, value, columnName) {
    // Use pg-format library to enable dynamic queries
    const sql = pgFormat('UPDATE pokemons SET %I = $1 WHERE id = $2 RETURNING *;', columnName);
    const { rows } = await pool.query(sql, [value, id]);

    return rows[0];
  }
}

module.exports = PokemonRepo;
