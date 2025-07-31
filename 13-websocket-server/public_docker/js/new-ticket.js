let API_BASE_URL = '';

async function loadConfig() {
  const config = await fetch('./config/config.json').then(res => res.json());
  API_BASE_URL = config.API_BASE_URL;
  initNewTicket();
}

loadConfig();

function initNewTicket() {
  const currentTicketLlb = document.querySelector('span');
  const createTicketBtn = document.querySelector('button');

  async function getLastTicket() {
    const lastTicket = await fetch(`${API_BASE_URL}/api/ticket/last`)
      .then(res => res.json());

    console.log("🚀 ~ getLastTicket ~ lastTicket:", lastTicket);
    currentTicketLlb.innerText = lastTicket;
  }

  async function createTicket() {
    console.log("🚀 ~ createTicket ~ createTicket:");
    const newTicket = await fetch(`${API_BASE_URL}/api/ticket`, {
      method: 'POST'
    }).then(res => res.json());

    currentTicketLlb.innerText = newTicket.number;
  }

  createTicketBtn.addEventListener('click', createTicket);

  getLastTicket();
}
