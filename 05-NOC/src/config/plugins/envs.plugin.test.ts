import { envs } from "./envs.plugins";



describe('envs.plugin.ts', () => {

  test('should return env options', () => {
    // console.log(envs);
    expect( envs ).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'test@test.com',
      MAILER_SECRET_KEY: '123456',
      PROD: true,
      MONGO_URL: 'mongodb://admin:admin@localhost:27017',
      MONGO_BD_NAME: 'NOCTEST',
      MONGO_USER: 'admin',
      MONGO_PASS: 'admin'
    })
  })

  test('should return error if not found envs', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';

    // console.log( envs );

    try {
      await import('./envs.plugins')
      expect( true ).toBe( false );
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer')
      // console.log( error );
    }
  })

})