import { NextFunction, Request, Response } from "express";


export class FileUploadMiddleware {
  static containFiles( req: Request, res: Response, next: NextFunction ) {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);
    console.log('Request headers:', req.headers);

    if( !req.files ) {
      console.log('No files object in request');
      return res.status(400).json({ error: 'No files were selected.' });
    }

    const fileKeys = Object.keys(req.files);
    console.log('File keys:', fileKeys);

    if( fileKeys.length === 0 ) {
      console.log('No files in request.files');
      return res.status(400).json({ error: 'No files were selected.' });
    }

    // Si el campo se llama 'file' en lugar de 'files'
    if (req.files.file) {
      req.files.files = req.files.file;
    }

    if( !req.files.files ) {
      console.log('No files.files in request');
      return res.status(400).json({ error: 'No files were selected.' });
    }

    console.log('Files type:', Array.isArray(req.files.files) ? 'Array' : 'Single file');
    next();
  }
}