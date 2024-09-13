import { Request, Response } from 'express';

const todos = [
  { id: 1, text: 'milk', createdAt: new Date() },
  { id: 2, text: 'bread', createdAt: null },
  { id: 3, text: 'butter', createdAt: new Date() }
];

export class TodosController {
  //! DI (dependency injection)
  constructor(){}


  public getTodos = (req:Request, res:Response) => {
    return res.json(todos)
  }

  //! ejemplo de utilización localhost:3000/api/todos/2
  public getTodoById = (req:Request, res:Response) => {
    //! el + convierte el valor en numerico
    const id = +req.params.id;
    if(isNaN(id)) return res.status(404).json({ error: `ID argument is not a number`})
    const todo = todos.find( todo => todo.id === id );
    
    ( todo )
      ? res.json( todo )
      : res.status(404).json({ error: `Todo with id ${id} not found`})
  };

  public createTodo = (req:Request, res:Response) => {
    const body = req.body;
    res.json(body)
  };
}