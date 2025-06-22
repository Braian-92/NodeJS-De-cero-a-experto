import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

  console.log('new client connected');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);

    const payload = {
      type: 'custom-message',
      payload: data.toString(),
    }

    //! enviar a todos los clientes conectados
    // wss.clients.forEach(client => {
    //   if(client.readyState === WebSocket.OPEN){
    //     client.send(JSON.stringify(payload), { binary: false });
    //   }
    // });

    //! enviar a todos los clientes conectados
    wss.clients.forEach(client => {
      if(client !== ws && client.readyState === WebSocket.OPEN){
        client.send(JSON.stringify(payload), { binary: false });
      }
    });

    ws.send( JSON.stringify(payload) );
  });

  // ws.send('Hola desde el servidor');

  // setInterval(() => {
  //   ws.send('Hola nuevamente desde el servidor');
  // }, 2000);

  ws.on('close', () => {
    console.log('client disconnected');
  });
});


console.log('Server is running on port http://localhost:3000');