let API_BASE_URL = '';
let WS_BASE_URL = '';

async function loadConfig() {
  const config = await fetch('./config/config.json').then(res => res.json());
  API_BASE_URL = config.API_BASE_URL;
  WS_BASE_URL = config.WS_BASE_URL;
  initDesk();
}

loadConfig();

function initDesk() {
  const lblPending = document.querySelector('#lbl-pending');
  const deskHeader = document.querySelector('h1');
  const noMoreAlert = document.querySelector('.alert');
  const lblCurrentTicket = document.querySelector('small');

  const btnDraw = document.querySelector('#btn-draw');
  const btnDone = document.querySelector('#btn-done');

  const searchParams = new URLSearchParams(window.location.search);

  if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es requerido');
  }

  const deskNumber = searchParams.get('escritorio');
  let workingTicket = null;
  deskHeader.innerText = deskNumber;

  function checkTicketCount(currentCount = 0) {
    noMoreAlert.classList.toggle('d-none');
    if (currentCount === 0) {
      noMoreAlert.classList.remove('d-none');
    } else {
      noMoreAlert.classList.add('d-none');
    }

    lblPending.innerText = currentCount;
  }

  async function loadInitialCount() {
    const pendingTickets = await fetch(`${API_BASE_URL}/api/ticket/pending`)
      .then(res => res.json());

    checkTicketCount(pendingTickets.length);
  }

  async function getTicket() {
    await finishTicket();

    const { status, ticket, message } = await fetch(`${API_BASE_URL}/api/ticket/draw/${deskNumber}`)
      .then(res => res.json());

    if (status === 'error') {
      lblCurrentTicket.innerText = message;
      return;
    }

    workingTicket = ticket;
    lblCurrentTicket.innerText = `Ticket ${ticket.number}`;
  }

  async function finishTicket() {
    if (!workingTicket) return;

    const { status, message } = await fetch(`${API_BASE_URL}/api/ticket/done/${workingTicket.id}`, {
      method: 'PUT'
    }).then(res => res.json());

    console.log("🚀 ~ finishTicket ~ status:", status);
    console.log("🚀 ~ finishTicket ~ message:", message);

    if (status === 'ok') {
      workingTicket = null;
      lblCurrentTicket.innerText = 'Nadie';
    }
  }

  function connectToWebSockets() {
    const socket = new WebSocket(`${WS_BASE_URL}/ws`);

    socket.onmessage = (event) => {
      console.log(event.data);
      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case 'on-ticket-count-changed':
          checkTicketCount(payload);
          break;
      }
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

  btnDraw.addEventListener('click', getTicket);
  btnDone.addEventListener('click', finishTicket);

  loadInitialCount();
  connectToWebSockets();
}
