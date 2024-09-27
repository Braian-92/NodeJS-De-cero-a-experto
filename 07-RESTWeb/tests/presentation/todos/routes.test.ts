import request from 'supertest'
import { testServer } from '../../test.server'


describe('Todo route testing', () => {

  //! ANTES DE TODAS LAS PRUEBAS
  beforeAll(async() => {
    await testServer.start()
  })

  //! DESPUES DE TODAS LAS PRUEBAS
  afterAll(() => {
    testServer.close();
  })



  test('should return TODOs api/todos', async () => {


    const response = await request( testServer.app )
      .get('/api/todos')
      .expect(200)

    console.log('test1');
    console.log(response.body);
    console.log('test2');

  })


})