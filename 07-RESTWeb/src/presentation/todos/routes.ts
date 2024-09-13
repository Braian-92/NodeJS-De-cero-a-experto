import { Router } from 'express';
import { TodosController } from './controller';



export class TodoRoutes {


  static get routes(): Router {

    const router = Router();

    const todoController = new TodosController();

    // router.get('/', (req, res) => todoController.getTodos(req, res) );
    //! Método corto: cuando los parámetros de la función son los mismos que se van a enviar al callback, se pueden obviar ambos.
    router.get('/', todoController.getTodos );


    return router;
  }


}