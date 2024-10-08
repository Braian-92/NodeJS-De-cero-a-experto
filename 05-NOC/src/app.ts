import { PrismaClient } from '@prisma/client';
import { envs } from './config/plugins/envs.plugins';
import { LogModel, MongoDatabase } from './data/mongo/';
import { Server } from "./presentation/server";

import path from 'path'



(async() => {
  main();
})();


async function main(){
  // console.log(envs)

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_BD_NAME
  });

  const prisma = new PrismaClient();

  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: 'MEDIUM',
  //     message: 'Test message',
  //     origin: path.basename(__filename)
  //   }
  // });
  // console.log( newLog );
  
  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: 'MEDIUM'
  //   }
  // })
  // console.log( logs );


  //! Crear una colección = tabla, documento = registro (row)
  // const newLog = await LogModel.create({
    // message: 'Test message desde Mongo',
    // origin: path.basename(__filename),
    // level: 'low'
  // })
  // await newLog.save()
  // console.log(newLog);
  
  //! baja la tabla completa si no se llana find()
  // const logs = await LogModel.find();
  // console.log(logs);


  // console.log('Mongo');
  Server.start();
  
}