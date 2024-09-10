import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from "./email.service"




describe('EmailService', () => {

  //? con este mock evitaremos usar un mail funcional y tener que usar credenciales reales en el .env.test
  const mockSendMail = jest.fn();

  //! Mock al createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail
  })

  const emailService = new EmailService();

  test('should send mail', async() => {



    

    const options: SendMailOptions = {
      to: 'necrofagodelamente@hotmail.com',
      subject: 'test',
      htmlBody: '<h1>TEST</h1>'
    }

    await emailService.sendMail( options );

    expect(mockSendMail).toHaveBeenCalledWith({
      "attachments": expect.any(Array),
      "html": "<h1>TEST</h1>",
      "subject": "test",
      "to": "necrofagodelamente@hotmail.com",
    })
  })


  test('should send email with attachements', async() => {

    const email = 'necrofagodelamente@hotmail.com';
    await emailService.sendEmailWithFileSystemLogs(email)

    expect( mockSendMail ).toHaveBeenCalledWith({
      to: email,
      subject: 'Log del sistema',
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: 'logs-low.log', path: './logs/logs-low.log' },
        { filename: 'logs-high.log', path: './logs/logs-high.log' },
        { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      ])
    })

  })


})