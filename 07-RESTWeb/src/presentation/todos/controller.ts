import { Request, Response } from 'express';

const todos = [
  { id: 1, text: 'milk', completeAt: new Date() },
  { id: 2, text: 'bread', completeAt: null },
  { id: 3, text: 'butter', completeAt: new Date() }
];

export class TodosController {
  //! DI (dependency injection)
  constructor(){}


  public getTodos = (req:Request, res:Response) => {
    return res.json(todos)
  }

  //! ejemplo de utilización localhost:3000/api/todos/2 GET
  public getTodoById = (req:Request, res:Response) => {
    //! el + convierte el valor en numerico
    const id = +req.params.id;
    if(isNaN(id)) return res.status(404).json({ error: `ID argument is not a number`})
    const todo = todos.find( todo => todo.id === id );
    
    ( todo )
      ? res.json( todo )
      : res.status(404).json({ error: `Todo with id ${id} not found`})
  };

  //! POST
  public createTodo = (req:Request, res:Response) => {
    const { text } = req.body;

    if( !text ) return res.status(404).json({ error: `Text property is required`});

    const newTodo = {
      id: todos.length + 1,
      text: text,
      completeAt: null
    };

    todos.push(newTodo)

    res.json(newTodo)
  };

  //! PUT
  public updateTodo = (req:Request, res:Response) => {
    const id = +req.params.id;
    if(isNaN(id)) return res.status(404).json({ error: `ID argument is not a number`});

    const todo = todos.find( todo => todo.id === id );
    if(!todo) return res.status(404).json({ error: `Todo with id ${id} not found`});

    const { text, completeAt } = req.body;
    // if( !text ) return res.status(404).json({ error: `Text property is required`});
    
    todo.text = text || todo.text;

    ( completeAt === 'null' )
      ? todo.completeAt = null
      : todo.completeAt = new Date( completeAt || todo.completeAt );

    res.json( todo );
  }

  public deleteTodo = (req:Request, res:Response) => {
    const id = +req.params.id; 
    const todo = todos.find( todo => todo.id === id );
    if(!todo) return res.status(404).json({ error: `Todo with id ${id} not found`});

    todos.splice( todos.indexOf(todo), 1);
    res.json( todo );
  }

}