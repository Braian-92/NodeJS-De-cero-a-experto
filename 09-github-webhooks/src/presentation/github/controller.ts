import { Request, Response } from "express";



export class GithubController {

  constructor() {}


  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header('x-github-event') ?? 'unknown';
    const payload = req.body;

    console.log({githubEvent});
    console.log(JSON.stringify(payload));

    res.status(200).send('Accepted');
  }
}