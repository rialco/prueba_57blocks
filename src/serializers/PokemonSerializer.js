const BaseSerializer = require('./BaseSerializer');

class PokemonSerializer extends BaseSerializer {
  constructor(model) {
    const serializedModel = model != null ? { ...model } : null;

    super('success', serializedModel);
  }
}

module.exports = PokemonSerializer;
