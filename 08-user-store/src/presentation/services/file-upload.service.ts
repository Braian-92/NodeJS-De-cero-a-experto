import path from 'path';
import fs from 'fs';
import { UploadedFile } from "express-fileupload";



export class FileUploadService {


  constructor() {}

  private checkFolder( folderPath: string ) {
    if( !fs.existsSync( folderPath )) {
      fs.mkdirSync( folderPath, { recursive: true });
    }
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = 'uploads',
    validExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif', 'webp']
  ) {
    try {

      const fileExtension = file.mimetype.split('/').at(1);
      const destination = path.resolve( __dirname, '../../../', folder )
      this.checkFolder( destination );

      file.mv(`${ destination }/mi-imagen.${ fileExtension }`);


    } catch (error) {
      console.log(error);
    }
  }


  uploadMultiple(
    file: any[],
    folder: string,
    validExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif', 'webp']
  ) {}
}