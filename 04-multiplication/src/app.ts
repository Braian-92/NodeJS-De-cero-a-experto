import { yarg } from "./config/plugins/args.plugin"

// console.log(process.argv)
// console.log('------------------------')
// console.log(yarg)

(async( ) => {
  await main()
  console.log('Fin de programa')
})()

async function main(){
  console.log('Main ejecutando')
}