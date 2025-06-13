import { Request, Response } from "express";



export class GithubController {

  constructor() {}


  webhookHandler = (req: Request, res: Response) => {
    console.log(req.body);
    console.log('Endpoint ejecutado');
    res.send('Hecho');
  }
}