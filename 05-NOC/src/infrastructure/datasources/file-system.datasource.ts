import fs from 'fs';
import { LogDatasource } from "../../domain/datasouces/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


//! cuando se hace el implements hacer click en FileSystemDatasource y poner ctrl + . para generar las 2 funciones necesarias
export class FileSystemDatasource implements LogDatasource {

  private readonly logPath = 'logs/';
  private readonly allLogPath = 'logs/logs-low.log';
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
      this.allLogPath,
      this.mediumLogPath,
      this.highLogPath
    ].forEach( path => {
      if( fs.existsSync( path ) ) return;

      fs.writeFileSync( path, '' );
    })

  }

  saveLog(log: LogEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getLog(severityLevel: LogSeverityLevel): Promise<void> {
    throw new Error("Method not implemented.");
  }

}