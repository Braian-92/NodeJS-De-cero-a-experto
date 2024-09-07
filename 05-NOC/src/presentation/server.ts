import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service"; 
import { SendMailLogs } from "../domain/use-cases/email/send-email-logs";

import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";


import { LogRepositoryImp } from "../infrastructure/repositories/log.repository.imp";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImp(
  // new FileSystemDatasource()
  // new MongoLogDatasource()
  new PostgresLogDatasource()
);

const emailService = new EmailService();
export class Server {
  public static async start() {
    console.log('Server started...')

    // new SendMailLogs(
    //   emailService,
    //   logRepository
    // ).execute(
    //   ['necrofagodelamente@hotmail.com', 'nattecheira@gmail.com']
    // )

    //! metodo de envio de mail sin archivos adjuntos
    // emailService.sendMail({
    //   to: 'nattecheira@gmail.com',
    //   subject: 'Logs de sistema 2',
    //   htmlBody: `
    //   <h3>Logs de sistema - NOC</h3>
    //   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    //   `
    // })

    //! enviar mail multiples con logs adjuntos
    // emailService.sendEmailWithFileSystemLogs(
    //   ['necrofagodelamente@hotmail.com', 'nattecheira@gmail.com']
    // )

    // const logs = await logRepository.getLogs(LogSeverityLevel.low)
    // console.log(logs);

    //! cron para revisar sitio cada cierto tiempo
    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const date = new Date();
        console.log('5 seconds', date);

        const url = 'https://google.com';

        new CheckService(
          logRepository,
          () => console.log(`${url} is ok`),
          ( error ) => console.log(error)
        ).execute(url)
      }
    )

  }
}
