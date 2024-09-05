import nodemailer from 'nodemailer';
import fs from 'fs';
import { envs } from '../../config/plugins/envs.plugins';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[]
}

interface Attachement {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  });


  async sendMail(options: SendMailOptions):Promise<boolean> {

    const { to, subject, htmlBody, attachements = [] } = options;

    try {

      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements
      })

      console.log(sentInformation);

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs ( to: string | string[] ){
    const subject = 'Log del sistema';
    const htmlBody = `
    <h3>Logs de sistema - NOC</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    `;
    const attachements:Attachement[] = [
      { filename: 'logs-low.log', path: './logs/logs-low.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
    ];
    console.log(` Verificar existencia de los archivos `);
    attachements.forEach(attachment => {
      if (fs.existsSync(attachment.path)) {
        console.log(`El archivo ${attachment.filename} existe en la ruta ${attachment.path}`);
      } else {
        console.log(`El archivo ${attachment.filename} NO existe en la ruta ${attachment.path}`);
      }
    });
    console.log(` Buscar archivos del directorio log para validar como se llaman realmente `);
    const directoryPath = './logs/';
    try {
      const files = fs.readdirSync(directoryPath);
      console.log(`Contenido del directorio ${directoryPath}:`);
      files.forEach(file => {
        console.log(file);
      });
    } catch (err) {
      console.error(`Error al leer el directorio ${directoryPath}:`, err);
    }
    console.log(` `);

    

    return this.sendMail({
      to, subject, attachements, htmlBody
    })
  }
}