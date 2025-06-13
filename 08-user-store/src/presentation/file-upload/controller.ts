import { Response, Request } from "express"
import { CustomError } from "../../domain";
import { FileUploadService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";




export class FileUploadController {
  // DI
  constructor (
    private readonly fileUploadService: FileUploadService
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log('Error en handleError:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }

  uploadFile = (req: Request, res: Response) => {
    const type = req.params.type;

    const file = req.files?.files as UploadedFile;
    if (!file) {
      return res.status(400).json({ error: 'No file was uploaded' });
    }

    console.log('Uploading single file:', file.name);

    this.fileUploadService.uploadSingle( file, `uploads/${ type }` )
      .then( uploaded => {
        console.log('File uploaded successfully:', uploaded);
        res.json( uploaded );
      })
      .catch( error => {
        console.log('Error uploading file:', error);
        this.handleError( error, res );
      });
  }

  uploadMultipleFiles = (req: Request, res: Response) => {
    const type = req.params.type;
    const files = req.files?.files as UploadedFile[];
    if (!files) {
      return res.status(400).json({ error: 'No files were uploaded' });
    }

    console.log('Files to upload:', files.map(f => f.name));

    this.fileUploadService.uploadMultiple( files, `uploads/${ type }` )
      .then( uploaded => {
        console.log('Files uploaded successfully:', uploaded);
        res.json( uploaded );
      })
      .catch( error => {
        console.log('Error uploading files:', error);
        this.handleError( error, res );
      });
  }

}