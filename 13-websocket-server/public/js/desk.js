
const lblPending = document.querySelector('#lbl-pending');

async function loadInitialCount(){
  const pending = await fetch('http://localhost:3000/api/ticket/pending')
    .then( res => res.json())

  lblPending.innerText = pending.length || 0;
}

function connectToWebSockets() {

  const socket = new WebSocket( 'ws://localhost:3000/ws' );

  socket.onmessage = ( event ) => {
    console.log(event.data);

    const { type, payload } = JSON.parse(event.data);

    switch(type){
      case 'on-ticket-count-changed':
        lblPending.innerText = payload;
        break;
    }
  };

  socket.onclose = ( event ) => {
    console.log( 'Connection closed' );
    setTimeout( () => {
      console.log( 'retrying to connect' );
      connectToWebSockets();
    }, 1500 );

  };

  socket.onopen = ( event ) => {
    console.log( 'Connected' );
  };

}





loadInitialCount();
connectToWebSockets();