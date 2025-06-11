


export class FileUploadService {


  constructor() {}

  private checkFolder( folderPath: string ) {
    throw new Error('Method not implemented.');
  }

  uploadSingle(
    file: any,
    folder: string,
    validExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif', 'webp']
  ) {}


  uploadMultiple(
    file: any[],
    folder: string,
    validExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif', 'webp']
  ) {}
}