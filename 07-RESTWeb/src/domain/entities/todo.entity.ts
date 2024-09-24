


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
}