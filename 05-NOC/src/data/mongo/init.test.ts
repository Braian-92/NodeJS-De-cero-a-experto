import mongoose from "mongoose"
import { MongoDatabase } from "./init"








describe('init MongoDB', () => {

  afterAll( () => {
    mongoose.connection.close()
  })


  test('should connect to MongoDB', async() => {

    // console.log('MONGO_BD_NAME', process.env.MONGO_BD_NAME);
    // console.log('MONGO_URL', process.env.MONGO_URL);

    const connected = await MongoDatabase.connect({
      dbName: process.env.MONGO_BD_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    })

    expect(connected).toBe(true);
  })

  test('should throw error', async () => {
    try {
      const connected = await MongoDatabase.connect({
        dbName: process.env.MONGO_BD_NAME!,
        mongoUrl: 'mongodb://error:error@error:error',
      });
      expect(true).toBe(false);
    } catch (error) {
      
    }
  })

})