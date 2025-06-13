import fs from 'fs';
import path from 'path';

import { Request, Response } from 'express';

export class ImagesController {

  constructor() {}


  getImage = ( req: Request, res: Response ) => {

    const { type = '', image = '' } = req.params;

    const imagePath = path.resolve( __dirname, `../../../uploads/${type}/${image}` );
    console.log("🚀 ~ ImagesController ~ imagePath:", imagePath)

    if( !fs.existsSync( imagePath )) {
      return res.status(400).json({ 
        message: 'Image not found'
      });
    }

    res.sendFile( imagePath );
  }
}