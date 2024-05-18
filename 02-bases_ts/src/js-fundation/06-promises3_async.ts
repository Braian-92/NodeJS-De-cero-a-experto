const { http } = require('../plugins/')

export const getPokemonByID3 = async (id: string | number): Promise<string> => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`

  const pokemon = await http.get(url)
  return pokemon.name
}
