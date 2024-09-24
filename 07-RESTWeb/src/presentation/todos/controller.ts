import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos/';
import { TodoRepository, GetTodos, GetTodo, CreateTodo, UpdateTodo, DeleteTodo } from '../../domain';

// const todos = [
//   { id: 1, text: 'milk', completeAt: new Date() },
//   { id: 2, text: 'bread', completeAt: null },
//   { id: 3, text: 'butter', completeAt: new Date() }
// ];

export class TodosController {
  //! DI (dependency injection)
  constructor(
    private readonly todoRepository: TodoRepository,
  ){}


  public getTodos = (req:Request, res:Response) => {
    
    new GetTodos( this.todoRepository )
    .execute()
    .then( res.json ) //! EQ || .then( todos => res.json(todos) )
    .catch( error => res.status(400).json({error}) );

  }

  //! ejemplo de utilización localhost:3000/api/todos/2 GET
  public getTodoById = (req:Request, res:Response) => {
    //! el + convierte el valor en numerico
    const id = +req.params.id;
    
    new GetTodo( this.todoRepository )
    .execute(id)
    .then( res.json )
    .catch( error => res.status(400).json({error}) );
    
  };

  //! POST
  public createTodo = (req:Request, res:Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    
    if( error ) return res.status( 400 ).json({ error });
    
    new CreateTodo(this.todoRepository)
      .execute( createTodoDto! )
      .then(res.json )
      .catch( error => res.status(400).json({error}) );

  };

  //! PUT
  public updateTodo = (req:Request, res:Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id
    })
    if( error ) return res.status( 400 ).json({ error });

   new UpdateTodo(this.todoRepository)
    .execute( updateTodoDto! )
    .then(res.json )
    .catch( error => res.status(400).json({error}) );

  }

  public deleteTodo = (req:Request, res:Response) => {
    const id = +req.params.id; 
    new DeleteTodo(this.todoRepository)
      .execute( id )
      .then(res.json )
      .catch( error => res.status(400).json({error}) );
  }

}