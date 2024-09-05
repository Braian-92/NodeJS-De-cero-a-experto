import { EmailService } from '../../../presentation/email/email.service'
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

import path from 'path'

interface SendLogEmailUsecase {
  execute: (to: string | string[]) => Promise<boolean>
}

export class SendMailLogs implements SendLogEmailUsecase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to)

      if (!sent) {
        throw new Error('Email log was not sent')
      }

      const log = new LogEntity({
        message: `Log email sent`,
        level: LogSeverityLevel.low,
        origin: path.basename(__filename)
      })
      this.logRepository.saveLog(log)

      return true
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: path.basename(__filename)
      })
      this.logRepository.saveLog(log)
      return false
    }
  }
}
