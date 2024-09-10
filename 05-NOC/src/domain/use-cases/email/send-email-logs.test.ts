import { LogEntity } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"
import { SendMailLogs } from "./send-email-logs"





describe('SendEmailLog', () => {

  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
  }

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const sendMailLogs = new SendMailLogs(
    mockEmailService as any,
    mockLogRepository
  )

  beforeEach = (() => {
    jest.clearAllMocks()
  })

  test('should call sendEmail and saveLog', async () => {

    

    const result = await sendMailLogs.execute('zamudiobraianhernan@gmail.com')

    expect( result ).toBe( true )
    expect( mockEmailService.sendEmailWithFileSystemLogs ).toBeCalledTimes(1)
    expect( mockLogRepository.saveLog ).toBeCalledWith( expect.any(LogEntity) )
    expect( mockLogRepository.saveLog ).toBeCalledWith({
      "createdAt": expect.any(Date),
      "level": "low",
      "message": "Log email sent",
      "origin": "send-email-logs.ts",
    })

  })

  test('should log in case of error', async () => {

    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)

    const result = await sendMailLogs.execute('zamudiobraianhernan@gmail.com')

    expect( result ).toBe( false )
    expect( mockEmailService.sendEmailWithFileSystemLogs ).toBeCalledTimes(2)
    expect( mockLogRepository.saveLog ).toBeCalledWith( expect.any(LogEntity) )
    expect( mockLogRepository.saveLog ).toBeCalledWith({
      "createdAt": expect.any(Date),
      "level": "low",
      "message": "Log email sent",
      "origin": "send-email-logs.ts",
    })

  })
  
})