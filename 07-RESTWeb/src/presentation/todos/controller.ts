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
      res.json(todo);
    } catch (error) {
      res.json({error})
    }
    
  };

  //! POST
  public createTodo = async(req:Request, res:Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    
    if( error ) return res.status( 400 ).json({ error });
    if (!createTodoDto) return res.status(500).json({ error: 'Unexpected error: DTO not created.' });

    const todo = await prisma.todo.create({
      data: {
        text: createTodoDto?.getText(),
      }
    });

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

    const todo = await prisma.todo.findFirst({
      where: { id } //! equivalencia de id: id
    });

    if(!todo) return res.status(404).json({ error: `Todo with id ${id} not found`});

    // const { text, completeAt } = req.body;
    
    const updatedTodo = await prisma.todo.update({
      where: { id }, //! equivalencia de id: id
      data: updateTodoDto!.values
    }); 

    res.json( updatedTodo );
  }

  public deleteTodo = async(req:Request, res:Response) => {
    const id = +req.params.id; 

    const todo = await prisma.todo.findFirst({
      where: { id } //! equivalencia de id: id
    });
    if(!todo) return res.status(404).json({ error: `Todo with id ${id} not found`});

    const deleted = await prisma.todo.delete({
      where: { id }
    });

    ( deleted )
      ? res.json( deleted )
      : res.status( 400 ).json({
        error: `Todo with id ${ id } not found`
      })
  }

}