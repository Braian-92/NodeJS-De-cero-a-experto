import { Server } from "./presentation/server";


//! funcion anonima autoinvocada
(async() =>{
  main()
})()

function main(){
  const server = new Server();
  server.start()
}