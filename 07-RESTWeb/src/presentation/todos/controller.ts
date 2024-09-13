import { Request, Response } from 'express';

const todos = [
  { id: 1, text: 'milk', createdAt: new Date() },
  { id: 1, text: 'bread', createdAt: null },
  { id: 1, text: 'butter', createdAt: new Date() }
];

export class TodosController {
  //! DI (dependency injection)
  constructor(){}


  public getTodos = (req:Request, res:Response) => {
    return res.json(todos)
  }
}