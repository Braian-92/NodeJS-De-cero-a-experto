

const currentTicketLlb = document.querySelector('span');
const createTicketBtn = document.querySelector('button');

async function getLastTicket(){
  // const lastTicket = await fetch('/api/ticket/last')
  const lastTicket = await fetch('http://localhost:3000/api/ticket/last')
  .then( res => res.json())
  
  console.log("🚀 ~ getLastTicket ~ lastTicket:", lastTicket)
  currentTicketLlb.innerText = lastTicket;
}


async function createTicket(){
  console.log("🚀 ~ createTicket ~ createTicket:")
  const newTicket = await fetch('http://localhost:3000/api/ticket', {
    method: 'POST'
  })
  .then( res => res.json())

  currentTicketLlb.innerText = newTicket.number;
}

createTicketBtn.addEventListener('click', createTicket);

getLastTicket();