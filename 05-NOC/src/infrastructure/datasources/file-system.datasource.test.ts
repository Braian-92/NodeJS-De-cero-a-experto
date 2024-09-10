import fs from 'fs'
import path from 'path'
import { FileSystemDatasource } from './file-system.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

describe('FileSystemDatasource', () => {
  const logPath = path.join(__dirname, '../../../logs')

  console.log({ logPath })

  // beforeEach( () => {
  //   fs.rmSync(logPath, {
  //     recursive: true,
  //     force: true
  //   })
  // })

  test('should create log file if they do not exist', () => {
    new FileSystemDatasource()
    const files = fs.readdirSync(logPath)
    expect(files).toEqual(['logs-high.log', 'logs-low.log', 'logs-medium.log'])
  })

  test('should save a log in all logs-low.log', () => {
    const logDataSource = new FileSystemDatasource()

    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts'
    })

    logDataSource.saveLog(log)

    const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8')
    console.log(allLogs)
    expect(allLogs).toContain(JSON.stringify(log))
  })

  test('should save a log in all logs-low.log and logs-medium.log', () => {
    const logDataSource = new FileSystemDatasource()

    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts'
    })

    logDataSource.saveLog(log)

    const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8')
    expect(allLogs).toContain(JSON.stringify(log))

    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8')
    expect(mediumLogs).toContain(JSON.stringify(log))

  })

  test('should save a log in all logs-low.log and logs-high.log', () => {
    const logDataSource = new FileSystemDatasource()

    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts'
    })

    logDataSource.saveLog(log)

    const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8')
    expect(allLogs).toContain(JSON.stringify(log))

    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8')
    expect(highLogs).toContain(JSON.stringify(log))

  })

  // test('should return all logs', async() =>  {
    

  //   const LogDatasource = new FileSystemDatasource(); 

  //   const lowLog = new LogEntity({
  //     message: 'low-log',
  //     level: LogSeverityLevel.low,
  //     origin: 'low'
  //   })

  //   const mediumLog = new LogEntity({
  //     message: 'medium-log',
  //     level: LogSeverityLevel.medium,
  //     origin: 'medium'
  //   })

  //   const highLog = new LogEntity({
  //     message: 'high-log',
  //     level: LogSeverityLevel.high,
  //     origin: 'high'
  //   })

  //   await LogDatasource.saveLog(lowLog)
  //   await LogDatasource.saveLog(mediumLog)
  //   await LogDatasource.saveLog(highLog)

  //   const lowLogGet = await LogDatasource.getLogs(LogSeverityLevel.low)
  //   const mediumLogGet = await LogDatasource.getLogs(LogSeverityLevel.medium)
  //   const highLogGet = await LogDatasource.getLogs(LogSeverityLevel.high)

  //   expect(lowLogGet).toEqual( expect.arrayContaining([lowLogGet, mediumLogGet, highLogGet]) )
  //   expect(mediumLogGet).toEqual( expect.arrayContaining([mediumLogGet]) )
  //   expect(highLogGet).toEqual( expect.arrayContaining([highLogGet]) )

  // })

  test('should not throw an error if path exist', () => {
    new FileSystemDatasource();
    new FileSystemDatasource();
    expect(true).toBeTruthy();
  })

  test('should throw an error if severity level is not defined', async() => {

    const logDataSource = new FileSystemDatasource();
    const customSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;

    try {
      await logDataSource.getLogs(customSeverityLevel)
      expect(true).toBeFalsy()
    } catch (error) {
      const errorString = `${ error }`
      console.log( errorString );
      expect(error).toContain(`${customSeverityLevel} not implemented`)
    }

  })


})
