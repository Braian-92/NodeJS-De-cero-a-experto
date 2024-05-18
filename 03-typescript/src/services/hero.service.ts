import { heroes } from '../data/heroes'

export const finHeroByID = (id: number) => {
  return heroes.find((hero) => hero.id === id)
}
