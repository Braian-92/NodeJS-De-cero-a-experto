import { CheckService } from "../domain/use-cases/checks/check-service"; 
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImp } from "../infrastructure/repositories/log.repository.imp";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service";

const fileSistemLogRepository = new LogRepositoryImp(
  new FileSystemDatasource()
);
export class Server {
  public static start() {
    console.log('Server started...')

    const emailService = new EmailService(
      fileSistemLogRepository
    );

    //! metodo de envio de mail sin archivos adjuntos
    // emailService.sendMail({
    //   to: 'nattecheira@gmail.com',
    //   subject: 'Logs de sistema 2',
    //   htmlBody: `
    //   <h3>Logs de sistema - NOC</h3>
    //   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    //   `
    // })

    emailService.sendEmailWithFileSystemLogs(
      ['necrofagodelamente@hotmail.com', 'nattecheira@gmail.com']
    )

    //! cron para revisar sitio cada cierto tiempo
    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const date = new Date();
    //     console.log('5 seconds', date);

    //     const url = 'https://google.com';

    //     new CheckService(
    //       fileSistemLogRepository,
    //       () => console.log(`${url} is ok`),
    //       ( error ) => console.log(error)
    //     ).execute(url)
    //   }
    // )
  }
}
