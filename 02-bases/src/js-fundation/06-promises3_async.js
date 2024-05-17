const getPokemonByID3 = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`

  const resp = await fetch( url )
  const pokemon = await resp.json()
  return pokemon.name
}

module.exports = getPokemonByID3
