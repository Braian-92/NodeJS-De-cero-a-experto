


function renderTickets( tickets = [] ){

  for(let i = 0; i < tickets.length; i++){
    if( i > 4 ) break;
    const ticket = tickets[i];
    if( !ticket ) break;

    const lblTicket = document.querySelector(`#lbl-ticket-0${ i+1 }`);
    const lvlDesk = document.querySelector(`#lbl-desk-0${ i+1 }`);

    if( lblTicket ){
      lblTicket.innerText = `Ticket ${ticket.number}`;
    }

    if( lvlDesk ){
      lvlDesk.innerText = `${ticket.handleDesk}`;
    }
  }

}



async function loadCurrentTickets(){
  const tickets = await fetch('http://localhost:3000/api/ticket/working-on')
  .then( res => res.json())
  
  console.log("🚀 ~ loadCurrentTickets ~ tickets:", tickets)
  renderTickets( tickets );
}

loadCurrentTickets();