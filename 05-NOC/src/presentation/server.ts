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

    const emailService = new EmailService();
    emailService.sendMail({
      to: 'nattecheira@gmail.com',
      subject: 'Logs de sistema',
      htmlBody: `
      <h3>Logs de sistema - NOC</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      `
    })

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
