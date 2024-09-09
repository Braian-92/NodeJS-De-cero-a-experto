import { CheckService } from "./check-service"




describe('Checkservice UseCase', () => {

  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckService(
    mockRepository,
    successCallback,
    errorCallback
  );

  test('should call successCallback when fetch return true', async() => {


    const wasOk = await checkService.execute('https://google.com')
    expect( wasOk ).toBe(true)

    
  })


})
