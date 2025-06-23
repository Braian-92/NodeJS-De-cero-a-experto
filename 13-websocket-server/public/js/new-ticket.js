

const currentTicketLlb = document.querySelector('span');
const currentTicketBtn = document.querySelector('button');

async function getLastTicket(){
  // const lastTicket = await fetch('/api/ticket/last')
  const lastTicket = await fetch('http://localhost:3000/api/ticket/last')
  .then( res => res.json())
  
  console.log("🚀 ~ getLastTicket ~ lastTicket:", lastTicket)
}

getLastTicket();