import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';





describe('FileSystemDatasource', () => {

  const logPath = path.join(__dirname, '../../../logs')

  console.log({logPath})

  beforeEach(() => {
    fs.rmSync(logPath, {
      recursive: true,
      force: true
    })
  })

  test('should create log file if they do not exist', () => {
    new FileSystemDatasource();
    const files = fs.readdirSync( logPath )
    expect( files ).toEqual(
      [ 'logs-high.log', 'logs-low.log', 'logs-medium.log' ]
    )
  })










})