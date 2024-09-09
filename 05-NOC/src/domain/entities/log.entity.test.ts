import { LogEntity, LogSeverityLevel } from './log.entity'

import path from 'path'

describe('LogEntity', () => {

  const dataObj = {
    message: 'Hola mundo.',
    level: LogSeverityLevel.high,
    origin: path.basename(__filename)
  }

  test('should create a LogEntity instance', () => {
    

    const log = new LogEntity(dataObj)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createdAt).toBeInstanceOf(Date)
  })


  test('should create a LogEntity instance from json', () => {

    const json = `{"message":"Service https://google.com working","level":"low","createdAt":"2024-09-09T01:07:05.014Z","origin":"check-service.ts"}`;

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe("Service https://google.com working")
    expect(log.level).toBe( LogSeverityLevel.low )
    expect(log.origin).toBe("check-service.ts")
    expect(log.createdAt).toBeInstanceOf(Date)

  })

  test('should create a LogEntity instance from Object', () => {


    const log = LogEntity.fromObject(dataObj)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createdAt).toBeInstanceOf(Date)

  })
})
