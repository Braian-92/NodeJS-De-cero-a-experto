import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { createServer } from 'http';
import { WssService } from './presentation/service/wss.service';


(async()=> {
  main();
})();


function main() {

  const server = new Server({
    port: envs.PORT,
  });

  const httpServer = createServer(server.app);

  WssService.initWss({ server: httpServer });

  server.setRoutes(AppRoutes.routes);

  // server.start();
  httpServer.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
  })
}