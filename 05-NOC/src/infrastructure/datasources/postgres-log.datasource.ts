import { PrismaClient } from "@prisma/client";
import { LogDatasource } from "../../domain/datasouces/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


const prismaCliente = new PrismaClient();


export class PostgresLogDatasource implements LogDatasource{
  saveLog(log: LogEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }

}