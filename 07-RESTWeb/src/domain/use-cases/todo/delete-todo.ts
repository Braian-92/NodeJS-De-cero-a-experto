import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";



export interface DeleteTodoUseCase {
  execute( id: number ): Promise<TodoEntity>
}

export class DeleteTodo implements DeleteTodoUseCase {

  constructor(
    public readonly repository: TodoRepository
  ){}

  execute( id: number ): Promise<TodoEntity> {
    return this.repository.deleteById(id);
  }

}