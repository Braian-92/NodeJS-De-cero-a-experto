interface Hero {
  id: number
  name: string
  owner: string
}

export const heroes: Hero[] = [
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
