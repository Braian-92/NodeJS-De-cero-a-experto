import { Ticket } from "../../domain/interfaces/ticket";
import { UuidAdapter } from "../../config/uuid";




export class TicketService {


  public readonly tickets:Ticket[] =[
    { id: UuidAdapter.v4(), number: 1, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 2, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 3, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 4, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 5, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 6, createdAt: new Date(), done: false },
  ];

  private readonly workingTickets: Ticket[] = [];

  public get pendingTickets(): Ticket[] {
    return this.tickets.filter(ticket => !ticket.handleDesk);
  }

  public get lastWorkingOnTickets():Ticket[] {
    return this.workingTickets.splice(0, 4);
  }

  public get lastTicketNumber() {
    //! la diferencia entre ? y ! despues de at es que ? es opcional y ! es obligatorio
    return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
  }

  public createTicket() {

    const ticket:Ticket = {
      id: UuidAdapter.v4(),
      number: this.lastTicketNumber + 1,
      createdAt: new Date(),
      done: false,
      handleAt: undefined,
      handleDesk: undefined,

    }

    this.tickets.push(ticket);
    return ticket;

  }

  public drawTickets(desk: string){
    const ticket = this.tickets.find( t => !t.handleDesk );
    if( !ticket ) return { status: 'error', message: 'No hay tickets pendientes'};

    ticket.handleDesk = desk;
    ticket.handleAt = new Date();

    //! unshift lo pone al inicio del arreglo
    //! utilizamos el metodo ... Spread para romper la referencia
    this.workingTickets.unshift({...ticket});

    //! TODO Ws

    return { status: 'ok', ticket }
  }

  public onFinishTicket(id:string){
    const ticket = this.tickets.find( t => t.id === id );
    if( !ticket ) return { status: 'error', message: 'Ticket no encontrado'};

    this.tickets.map( ticket =>{
      if( ticket.id === id ) {
        ticket.done = true;
      }
      return ticket;
    })

    return { status: 'ok' };
  }


}