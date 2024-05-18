import { finHeroByID } from './services/hero.service'

const hero = finHeroByID(2)
console.log(hero?.name ?? 'Hero not found')
