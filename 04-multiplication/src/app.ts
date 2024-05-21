import { yarg } from "./config/plugins/args.plugin"

// console.log(process.argv)
// console.log('------------------------')
// console.log(yarg)

(async( ) => {
  await main()
})()

async function main(){
  console.log(yarg)
}