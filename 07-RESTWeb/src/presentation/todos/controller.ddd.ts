import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos/';
import { TodoRepository } from '../../domain';

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


  public getTodos = async(req:Request, res:Response) => {
    const todos = await this.todoRepository.getAll();
    return res.json(todos);
  }

  //! ejemplo de utilización localhost:3000/api/todos/2 GET
  public getTodoById = async(req:Request, res:Response) => {
    //! el + convierte el valor en numerico
    const id = +req.params.id;
    if(isNaN(id)) return res.status(404).json({ error: `ID argument is not a number`})

    try {
      const todo = await this.todoRepository.findById(id);
      return res.json(todo);
    } catch (error) {
      res.json({error})
    }
    
  };

  //! POST
  public createTodo = async(req:Request, res:Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    
    if( error ) return res.status( 400 ).json({ error });
    if (!createTodoDto) return res.status(500).json({ error: 'Unexpected error: DTO not created.' });

    const todo = await this.todoRepository.create(createTodoDto!);

    res.json(todo)
  };

  //! PUT
  public updateTodo = async(req:Request, res:Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id
    })
    if( error ) return res.status( 400 ).json({ error });

    const updatedTodo = await this.todoRepository.updateById( updateTodoDto! )

    return res.json( updatedTodo );
  }

  public deleteTodo = async(req:Request, res:Response) => {
    const id = +req.params.id; 

    const deleteTodo = await this.todoRepository.deleteById(id);
    res.json(deleteTodo)
  }

}