import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

  console.log('new client connected');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    ws.send(data.toString().toUpperCase());
  });

  ws.send('Hola desde el servidor');

  // setInterval(() => {
  //   ws.send('Hola nuevamente desde el servidor');
  // }, 2000);

  ws.on('close', () => {
    console.log('client disconnected');
  });
});


console.log('Server is running on port http://localhost:3000');