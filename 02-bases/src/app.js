const { emailTemplete } = require('./js-fundation/01-templete')
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
  if (error){
    throw new Error(error, id)
  }
  console.log("🚀 ~ getUserByID ~ user:", user)
})

require('./js-fundation/05-factory')
