import { Ticket } from "../../domain/interfaces/ticket";
import { UuidAdapter } from "../../config/uuid";




export class TicketService {


  private readonly _tickets:Ticket[] =[
    { id: UuidAdapter.v4(), number: 1, createdAt: new Date(), handleAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 2, createdAt: new Date(), handleAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 3, createdAt: new Date(), handleAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 4, createdAt: new Date(), handleAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 5, createdAt: new Date(), handleAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 6, createdAt: new Date(), handleAt: new Date(), done: false },
  ];



}