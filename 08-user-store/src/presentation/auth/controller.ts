import { Request, Response } from "express"
import { RegisterUserDto } from "../../domain"




export class AuthController {
  // DI
  constructor () {}


  registerUser = (req: Request, res: Response) => {
    // Obtener datos del body o de query params si están disponibles
    const data = {
      ...req.body,
      ...req.query
    };
    
    console.log('Data received:', data);
    const [error, registerDto] = RegisterUserDto.create(data);
    
    if (error) return res.status(400).json({ error });
    
    return res.json(registerDto);
  }

  loginUser = (req: Request, res: Response) => {
    res.json('loginUser')
  }

  validateEmail = (req: Request, res: Response) => {
    res.json('validateEmail')
  }


}