import { Router } from 'express';
import { TodosController } from './controller';
import { TodoDatasourceImp } from '../../infrastructure/datasource/todo.datasource.imp';
import { TodoRepositoryImp } from '../../infrastructure/repositories/todo.repository.imp';



export class TodoRoutes {


  static get routes(): Router {

    const router = Router();

    //! si queremos cambiar el datasurce cambiar la linea de abajo
    const datasource = new TodoDatasourceImp();

    const todoRepository = new TodoRepositoryImp(datasource);
    const todoController = new TodosController(todoRepository);

    // router.get('/', (req, res) => todoController.getTodos(req, res) );
    //! Método corto: cuando los parámetros de la función son los mismos que se van a enviar al callback, se pueden obviar ambos.
    router.get('/', todoController.getTodos );
    router.get('/:id', todoController.getTodoById );
    router.post('/', todoController.createTodo );
    router.put('/:id', todoController.updateTodo );
    router.delete('/:id', todoController.deleteTodo );


    return router;
  }


}