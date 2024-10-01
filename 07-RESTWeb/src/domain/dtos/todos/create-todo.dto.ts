

export class CreateTodoDto {

  private constructor(
    private readonly text: string,
  ){}

  // Getter para acceder a la propiedad 'text'
  public getText(): string {
    return this.text;
  }

  static create( props: { [key:string]:any } ): [string?, CreateTodoDto?] {

    const { text } = props;

    // if( !text ) return ['Text property is required', undefined];
    //! metodo corto ya que el segundo parametro al no enviarlo es undefined
    if( !text || text.length === 0 ) return ['Text property is required'];

    return [undefined, new CreateTodoDto(text)];
  }

}