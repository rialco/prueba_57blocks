/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
        INSERT INTO pokemons (user_id, name, public) 
        VALUES 
        (1, 'Pikachu', TRUE),
        (1, 'Charmander', TRUE),
        (1, 'Squirtle', TRUE),
        (1, 'Bulbasaur', TRUE),
        (1, 'Meowth', TRUE),
        (1, 'Growlithe', TRUE),
        (1, 'Cyndaquil', TRUE),
        (1, 'Totodile', TRUE),
        (1, 'Chicorita', TRUE),
        (1, 'Charizard', TRUE),
        (1, 'Blastoise', TRUE),
        (1, 'Venasaur', TRUE),
        (1, 'Zapdos', TRUE),
        (1, 'Articuno', TRUE),
        (1, 'Moltres', TRUE),
        (1, 'Dragonite', TRUE),
        (1, 'Dratini', TRUE),
        (1, 'Pidgey', TRUE),
        (1, 'Pidgeot', TRUE),
        (1, 'Mug', TRUE),
        (1, 'Koffin', TRUE),
        (1, 'Zubat', TRUE);
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
        DELETE FROM pokemons WHERE user_id = 1;
    `);
};
