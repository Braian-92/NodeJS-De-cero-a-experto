import { Router } from 'express';
import { TicketsRoutes } from './tickets/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );

    router.use('/api/ticket', TicketsRoutes.routes);



    return router;
  }


}

