import mongoose from "mongoose"
import { envs } from "../../config/plugins/envs.plugins"
import { MongoDatabase } from "../../data/mongo"
import { MongoLogDatasource } from "./mongo-log.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"



describe('Pruebas en MongoLogDatasource', () => {

  beforeAll = ( async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_BD_NAME,
      mongoUrl: envs.MONGO_URL
    }) 
  }) 

  afterAll( () => {
    mongoose.connection.close();
  })

  test('should create a log', async() => {
    const logDataSource = new MongoLogDatasource()

    const logSpy = jest.spyOn(console, 'log')

    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: 'test-message',
      origin: 'mongo-log.datasource.ts'
    })

    await logDataSource.saveLog(log)

    expect( logSpy ).toHaveBeenCalled()
    expect( logSpy ).toHaveBeenCalledWith()

  })


})