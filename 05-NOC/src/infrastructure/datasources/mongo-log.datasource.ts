import { LogModel } from "../../data/mongo";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogDatasource } from "../../domain/datasouces/log.datasource";


export class MongoLogDatasource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log)
    // await newLog.save() //! opcional igual lo guarda
    console.log('Log en MongoLogDatasource', newLog.id );
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({
      level: severityLevel
    })

    return logs.map( mongoLog => LogEntity.fromObject(mongoLog) )
    //! si se quiere pasar la referencia a la funcion se puede resumir
    // return logs.map( LogEntity.fromObject )
  }

}