const { emailTemplete } = require('./js-fundation/01-templete')
//! usado en 05-factory2
const { getUUID, getAge } = require('./plugins/')

// console.log('🚀 ~ emailTemplete:', emailTemplete)
console.log(
  'INICIO -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------'
)
// require('./js-fundation/02-destructuring')
// const { getUserByID } = require('./js-fundation/03-callbacks')
// const id = 2
// getUserByID(id, function(error, user) {
//   if (error){
//     throw new Error(error, id)
//   }
//   console.log("🚀 ~ getUserByID ~ user:", user)
// })
const { getUserByID } = require('./js-fundation/04-arrow')
const id = 2
getUserByID(id, (error, user) => {
  if (error) {
    throw new Error(error, id)
  }
  // console.log('🚀 ~ getUserByID ~ user:', user)
})

// require('./js-fundation/05-factory')
const { buildMakePerson } = require('./js-fundation/05-factory2')

const makePerson = buildMakePerson({ getUUID, getAge })

const obj = {
  name: 'Braian',
  birthdate: '1992-11-04'
}

const braian = makePerson(obj)
// console.log("🚀 ~ obj:", obj)

//! 06-promises

// const getPokemonByID = require('./js-fundation/06-promises')
// getPokemonByID(4, (pokemon) => {
//   // console.log({ pokemon })
// })

// const getPokemonByID2 = require('./js-fundation/06-promises2')

// getPokemonByID2(4)
//   .then((pokemon) => console.log({pokemon}))
//   .catch( (err) => console.log('Por favor intente de nuevo') )
//   .finally( () => console.log('Finalmente') )

const getPokemonByID3 = require('./js-fundation/06-promises3_async')

getPokemonByID3(4)
  .then((pokemon) => console.log({pokemon}))
  .catch( (err) => console.log('Por favor intente de nuevo') )
  .finally( () => console.log('Finalmente') )
