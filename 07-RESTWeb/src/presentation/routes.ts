import { Router } from 'express';
import { TodosController } from './todos/controller';
import { TodoRoutes } from './todos/routes';
import { TodoDatasourceImp } from '../infrastructure/datasource/todo.datasource.imp';
import { TodoRepositoryImp } from '../infrastructure/repositories/todo.repository.imp';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    // const todoController = new TodosController();

    //! si queremos cambiar el datasurce cambiar la linea de abajo
    const datasource = new TodoDatasourceImp();

    const todoRepository = new TodoRepositoryImp(datasource);
    const todoController = new TodosController(todoRepository);

    // router.get('/api/todos', (req, res) => todoController.getTodos(req, res) );
    //! Método corto: cuando los parámetros de la función son los mismos que se van a enviar al callback, se pueden obviar ambos.
    router.use('/api/todos', TodoRoutes.routes );


    return router;
  }


}