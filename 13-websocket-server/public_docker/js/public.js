let API_BASE_URL = '';
let WS_BASE_URL = '';

async function loadConfig() {
  const config = await fetch('./config/config.json').then(res => res.json());
  API_BASE_URL = config.API_BASE_URL;
  WS_BASE_URL = config.WS_BASE_URL;
  initPublicScreen();
}

loadConfig();

function initPublicScreen() {

  function renderTickets(tickets = []) {
    for (let i = 0; i < tickets.length; i++) {
      if (i > 4) break;
      const ticket = tickets[i];
      if (!ticket) break;

      const lblTicket = document.querySelector(`#lbl-ticket-0${i + 1}`);
      const lvlDesk = document.querySelector(`#lbl-desk-0${i + 1}`);

      if (lblTicket) {
        lblTicket.innerText = `Ticket ${ticket.number}`;
      }

      if (lvlDesk) {
        lvlDesk.innerText = `${ticket.handleDesk}`;
      }
    }
  }

  async function loadCurrentTickets() {
    const tickets = await fetch(`${API_BASE_URL}/api/ticket/working-on`)
      .then(res => res.json());

    console.log("🚀 ~ loadCurrentTickets ~ tickets:", tickets);
    renderTickets(tickets);
  }

  function connectToWebSockets() {
    const socket = new WebSocket(`${WS_BASE_URL}/ws`);

    socket.onmessage = (event) => {
      console.log(event.data);

      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case 'on-working-changed':
          renderTickets(payload);
          break;
      }
    };

    socket.onclose = () => {
      setTimeout(() => {
        connectToWebSockets();
      }, 1500);
    };

    socket.onopen = () => {
      console.log('Connected');
    };
  }

  loadCurrentTickets();
  connectToWebSockets();
}
