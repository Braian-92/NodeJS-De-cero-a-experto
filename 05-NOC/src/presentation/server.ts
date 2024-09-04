import { CheckService } from "../domain/use-cases/checks/check-service"; 
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImp } from "../infrastructure/repositories/log.repository.imp";
import { CronService } from "./cron/cron-service"

const fileSistemLogRepository = new LogRepositoryImp(
  new FileSystemDatasource()
);
export class Server {
  public static start() {
    console.log('Server started...')

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const date = new Date();
        console.log('5 seconds', date);

        const url = 'https://google.comas';

        new CheckService(
          fileSistemLogRepository,
          () => console.log(`${url} is ok`),
          ( error ) => console.log(error)
        ).execute(url)
      }
    )
  }
}
