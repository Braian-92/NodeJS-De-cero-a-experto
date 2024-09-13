import express, { Router } from 'express';
import path from 'path';

interface Options {
  port: number,
  routes: Router;
  public_path?: string;
}

export class Server {

  private app = express();
  private readonly port: number;
  private readonly public_path: string;
  private readonly routes: Router;

  constructor(options: Options){
    const { port, routes, public_path = 'public' } = options;
    this.port = port; 
    this.public_path = public_path; 
    this.routes = routes;
  }

  async start(){

    //! Middlewares
    this.app.use( express.json() ) //! serializador de respuesta => raw
    this.app.use( express.urlencoded({extended:true}) ) //! serializador de respuesta => x-www-form-urlencoded

    //! Public folder
    this.app.use( express.static( this.public_path ) )

    
    //! Routes
    this.app.use( this.routes );


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