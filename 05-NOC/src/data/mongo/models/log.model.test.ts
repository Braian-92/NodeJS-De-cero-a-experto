import mongoose from 'mongoose'
import { envs } from '../../../config/plugins/envs.plugins'
import { MongoDatabase } from '../init'
import { LogModel } from './log.model'

describe('log.model.test.ts', () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_BD_NAME
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  test('should return LogModel', async () => {
    const logData = {
      origin: 'log.model.test.ts',
      message: 'test-message',
      level: 'low'
    }

    const log = await LogModel.create(logData)
    console.log(log)
    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        createdAt: expect.any(Date),
        id: expect.any(String)
      })
    )
  })
})
