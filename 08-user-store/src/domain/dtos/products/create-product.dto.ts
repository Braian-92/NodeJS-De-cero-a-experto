import { Validators } from "../../../config";


export class CreateProductDto {

  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string, //! ID
    public readonly category: string, //! ID
  ) {}

  static create( props: { [key: string]: any } ): [string?, CreateProductDto?] {
    const { 
      name,
      available,
      price,
      description,
      user,
      category 
    } = props;

    if( !name ) return ['Name is required'];
    
    if( !user ) return ['User is required'];
    if( !Validators.isMongoId( user ) ) return ['User is not a valid ID'];

    if( !category ) return ['Category is required'];
    if( !Validators.isMongoId( category ) ) return ['Category is not a valid ID'];

    return [undefined, new CreateProductDto( name, available, price, description, user, category )];
    
  }
}
