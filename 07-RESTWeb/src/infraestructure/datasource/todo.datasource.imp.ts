import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";



export class TodoDatasourceImp implements TodoDatasource {

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: {
        text: createTodoDto?.getText(),
      }
    });
    return TodoEntity.fromObject(todo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    // return todos.map( todo => TodoEntity.fromObject(todo) );
    //! metodo corto cuando el parameto es el mismo que se envia a la funcion se puede compactar
    return todos.map( TodoEntity.fromObject );
  }
  
  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: { id } //! equivalencia de id: id
    });

    if(!todo) throw `Todo with id ${id} not found`;
    return TodoEntity.fromObject(todo);
  }

  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById( updateTodoDto.id );

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id }, //! equivalencia de id: id
      data: updateTodoDto!.values
    });

    return TodoEntity.fromObject(updateTodoDto);
  }

  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById( id );

    const deleted = await prisma.todo.delete({
      where: { id }
    });

    return TodoEntity.fromObject( deleted );
  }

}