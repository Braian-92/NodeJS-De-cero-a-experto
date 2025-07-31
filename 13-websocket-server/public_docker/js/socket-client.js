let WS_BASE_URL = '';

async function loadConfig() {
  const config = await fetch('./config/config.json').then(res => res.json());
  WS_BASE_URL = config.WS_BASE_URL;
  connectToWebSockets();
}

loadConfig();

function connectToWebSockets() {
  const socket = new WebSocket(`${WS_BASE_URL}/ws`);

  socket.onmessage = (event) => {
    console.log(event.data);
  };

  socket.onclose = () => {
    console.log('Connection closed');
    setTimeout(() => {
      console.log('retrying to connect');
      connectToWebSockets();
    }, 1500);
  };

  socket.onopen = () => {
    console.log('Connected');
  };
}
