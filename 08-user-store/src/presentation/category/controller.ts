import { Response, Request } from "express"
import { CreateCategoryDto, CustomError } from "../../domain"




export class CategoryController {
  // DI
  constructor () {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${ error }`);
    return res.status(500).json({ error: 'Internal server error' });
  }

  createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create( req.body );
    if( error ) return res.status(400).json({ error });

    res.json(createCategoryDto);
  }

  getCategory = (req: Request, res: Response) => {
    res.json('Categories get');
  }

}