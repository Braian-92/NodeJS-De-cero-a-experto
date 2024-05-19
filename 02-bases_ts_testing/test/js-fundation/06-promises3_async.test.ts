import { getPokemonByID3 } from '../../src/js-fundation/06-promises3_async'

describe('js-fundation/06-promises3_async', () => {
  test('getPokemonByID3 should return a pokemon', async () => {
    const pokemonId = 1
    const pokemon = await getPokemonByID3(pokemonId)
    expect(pokemon).toBe('bulbasaur')
  }, 10000); // Aumenta el timeout a 10 segundos

  test('should return an error if pokemon not exist', async () => {
    const pokemonId = 1000000000000000000
    try {
      await getPokemonByID3(pokemonId)
      expect(true).toBeFalsy()
    } catch (error) {
      expect(error).toBe(`Pokemon not found with id ${pokemonId}`)
    }
  })
})
