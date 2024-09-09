import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";





describe('log.datasource.ts LogDatasource', () => {

  const newLog = new LogEntity({
    origin: 'log.datasource.test.ts',
    message: 'test-message',
    level: LogSeverityLevel.low
  })

  class MockLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }

  }


  test('should test the abstract class', () => {


    const mockLogDatasource = new MockLogDatasource()

    expect( mockLogDatasource ).toBeInstanceOf(MockLogDatasource)


  })


})