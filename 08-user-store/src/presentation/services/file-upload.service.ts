import path from 'path';
import fs from 'fs';
import { UploadedFile } from "express-fileupload";
import { Uuid } from '../../config';
import { CustomError } from '../../domain';


export class FileUploadService {


  constructor(
    private readonly uuid = Uuid.v4
  ) {}

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
      console.log('Processing file:', file.name);
      console.log('File mimetype:', file.mimetype);

      const fileExtension = file.mimetype.split('/').at(1) ?? '';

      if( !validExtensions.includes( fileExtension )) {
        throw CustomError.badRequest(
          `Invalid file extension: ${ fileExtension }, valid extensions: ${ validExtensions.join(', ') }`
        );
      }

      const destination = path.resolve( __dirname, '../../../', folder )
      this.checkFolder( destination );

      const fileName = `${ this.uuid() }.${ fileExtension }`;
      const filePath = `${ destination }/${ fileName }`;

      console.log('Saving file to:', filePath);

      try {
        await file.mv(filePath);
        console.log('File saved successfully');
      } catch (error) {
        console.error('Error saving file:', error);
        throw CustomError.internalServer('Error saving file');
      }

      return { fileName };

    } catch (error) {
      console.error('Error in uploadSingle:', error);
      throw error;
    }
  }


  async uploadMultiple(
    files: UploadedFile[],
    folder: string,
    validExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif', 'webp']
  ) {
    console.log('Starting multiple file upload');
    console.log('Number of files:', files.length);

    try {
      const uploadPromises = files.map(file => this.uploadSingle(file, folder, validExtensions));
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error in uploadMultiple:', error);
      throw error;
    }
  }
}