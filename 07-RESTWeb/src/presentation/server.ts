import express from 'express';
import path from 'path';

interface Options {
  port: number,
  public_path?: string;
}

export class Server {

  private app = express();
  private readonly port: number;
  private readonly public_path: string;

  constructor(options: Options){
    const { port, public_path = 'public' } = options;
    this.port = port; 
    this.public_path = public_path; 
  }

  async start(){

    //! Middlewares

    //! Public folder
    this.app.use( express.static( this.public_path ) )

    this.app.get('/api/todos', (req, res) => {
      res.json([
        { id: 1, text: 'milk', createdAt: new Date() },
        { id: 1, text: 'bread', createdAt: null },
        { id: 1, text: 'butter', createdAt: new Date() },
      ])
    })
    //! SPA
    this.app.get('*', (req, res) => {
      /* console.log(req.url);
      res.send('Hola mundo!') */
      const indexPath = path.join( __dirname + `../../../${this.public_path}/index.html` )
      res.sendFile(indexPath)
      return;
    })

    
    this.app.listen(this.port, () => {
      console.log(`Server running on PORT ${this.port}`);
    })


  }
}