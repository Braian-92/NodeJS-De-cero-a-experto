


export class TodoEntity {

  constructor(
    public id: number,
    public text: string,
    public coompleteAt?: Date|null
  ){}

  get isCompleted() {
    // doble negación si tiene un valor es true
    return !!this.coompleteAt;
  }

  public static fromObject(object: {[key: string]: any} ){
    const { id, text, completeAt } = object;
    if( !id ) throw 'Id is required';
    if( !text ) throw 'Text is required';

    let newCompleteAt;
    if( completeAt ) {
      newCompleteAt = new Date(completeAt);
      if( isNaN( newCompleteAt.getTime() ) ){
        throw 'CompleteAt is not a valid date';
      }
    }

    new TodoEntity(id, text, completeAt)
    
  }
}