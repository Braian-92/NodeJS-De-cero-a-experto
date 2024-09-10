import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'
import { LogRepositoryImp } from './log.repository.imp'

describe('LogRepositoryImpl', () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const logRepository = new LogRepositoryImp(mockLogDatasource)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('savelog should call the datasource with arguments', async () => {
    // const log = {
    //   level: LogSeverityLevel.low,
    //   message: 'hola'
    // } as LogEntity

    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'hola',
      origin: 'hola'
    })

    await logRepository.saveLog(log)

    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log)
  })

  test('getLogs should call the datasource with arguments', async() => {

    const lowSeverity = LogSeverityLevel.low;

    await logRepository.getLogs( lowSeverity );
    expect( mockLogDatasource.getLogs ).toBeCalledWith( lowSeverity )

  })

})
