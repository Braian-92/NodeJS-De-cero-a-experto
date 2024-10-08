import fs from 'fs';
import { LogDatasource } from "../../domain/datasouces/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


//! cuando se hace el implements hacer click en FileSystemDatasource y poner ctrl + . para generar las 2 funciones necesarias
export class FileSystemDatasource implements LogDatasource {

  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/logs-low.log';
  private readonly mediumLogPath = 'logs/logs-medium.log';
  private readonly highLogPath = 'logs/logs-high.log';

  constructor() {
    this.createLogsFile();
  }

  private createLogsFile = () => {

    if( !fs.existsSync( this.logPath ) ){
      fs.mkdirSync( this.logPath );
    }

    [
      this.allLogsPath,
      this.mediumLogPath,
      this.highLogPath
    ].forEach( path => {
      if( fs.existsSync( path ) ) return;

      fs.writeFileSync( path, '' );
    })

  }

  async saveLog(newLog: LogEntity): Promise<void> {
    
    const logAsJson = `${JSON.stringify(newLog)}\n`;
    
    fs.appendFileSync( this.allLogsPath , logAsJson)


    if( newLog.level === LogSeverityLevel.low ) return;


    // if( newLog.level === LogSeverityLevel.low ) {
      // fs.appendFileSync( this.allLogsPath , logAsJson)
    // }else 
    if( newLog.level === LogSeverityLevel.medium ) {
      fs.appendFileSync( this.mediumLogPath , logAsJson)
    }else{
      fs.appendFileSync( this.highLogPath , logAsJson)
    }

    console.log('Log en FileSystemDatasource');

  }

  private getLogsFromFile = ( path:string ): LogEntity[] => {

    const content = fs.readFileSync( path, 'utf-8' );
    
    if ( content === '' ) return [];

    const logs = content.split(`\n`).map(
      log => LogEntity.fromJson(log)
    )

    return logs;
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch ( severityLevel ){
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);

      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogPath);

      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogPath);

      default:
        throw new Error(`${severityLevel} not implemented`);
    }
  }

}