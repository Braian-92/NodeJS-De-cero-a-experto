import { LogEntity } from '../../entities/log.entity'
import { CheckService } from './check-service'

describe('Checkservice UseCase', () => {
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const successCallback = jest.fn()
  const errorCallback = jest.fn()

  const checkService = new CheckService(
    mockRepository,
    successCallback,
    errorCallback
  )

  beforeEach( () => {
    jest.clearAllMocks();
  })

  test('should call successCallback when fetch return true', async () => {
    const wasOk = await checkService.execute('https://google.com')
    expect(wasOk).toBe(true)
    expect(successCallback).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()

    expect(mockRepository.saveLog).toBeCalledWith(
      expect.any( LogEntity )
    )

  })


  test('should call errorCallback when fetch return false', async () => {
    const wasNotOk = await checkService.execute('https://google.comasasas')
    expect(wasNotOk).toBe(false)
    expect(errorCallback).toHaveBeenCalled()
    expect(successCallback).not.toHaveBeenCalled()

    expect(mockRepository.saveLog).toBeCalledWith(
      expect.any( LogEntity )
    )

  })

})
