import { Router } from 'express';
import { ImagesController } from './controller';


export class ImagesRoutes {

  static get routes(): Router {
    const router = Router();

    const controller = new ImagesController();

    router.get('/:type/:image', controller.getImage );

    return router;
  }

}