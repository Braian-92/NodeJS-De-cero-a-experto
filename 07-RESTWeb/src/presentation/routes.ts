import { Router } from 'express';
import { TodosController } from './todos/controller';
import { TodoRoutes } from './todos/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    const todoController = new TodosController();

    // router.get('/api/todos', (req, res) => todoController.getTodos(req, res) );
    //! Método corto: cuando los parámetros de la función son los mismos que se van a enviar al callback, se pueden obviar ambos.
    router.use('/api/todos', TodoRoutes.routes );


    return router;
  }


}