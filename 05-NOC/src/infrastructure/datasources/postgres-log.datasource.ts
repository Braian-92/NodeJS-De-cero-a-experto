import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasouces/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

import path from 'path'

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH
}
export class PostgresLogDatasource implements LogDatasource{

  async saveLog(log: LogEntity): Promise<void> {

    const level = severityEnum[log.level];

    const newLog = await prismaClient.logModel.create({
      data: {
        ...log,
        level: level
      }
    });
    console.log( newLog );
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];

    const dbLogs = await prismaClient.logModel.findMany({
      where: { level } //! esto es igual a level:level
    })

    return dbLogs.map( LogEntity.fromObject ); //! forma corta
    // return dbLogs.map( dbLog => LogEntity.fromObject(dbLog) );
  }

}