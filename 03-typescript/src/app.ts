const heroes = [
  {
    id: 1,
    name: 'Ironman',
    owner: 'marvel'
  },
  {
    id: 2,
    name: 'Spiderman',
    owner: 'marvel'
  },
  {
    id: 3,
    name: 'Batman',
    owner: 'DC'
  }
]

const finHeroByID = (id: number) => {
  return heroes.find((hero) => hero.id === id)
}

const hero = finHeroByID(2)
console.log(hero?.name ?? 'Hero not found')
