import { Router } from "express";
import { TicketsController } from "./controller";





export class TicketsRoutes {

  static get routes(): Router {
    const router = Router();
    const ticketsController = new TicketsController();

    router.get('/', ticketsController.getTickets);
    router.get('/last', ticketsController.getLastTicketNumber);
    router.get('/pending', ticketsController.pendingTickets);

    router.post('/', ticketsController.createTicket);

    router.get('/draw/:desk', ticketsController.drawTicket);
    router.put('/done/:ticketId', ticketsController.ticketFinished);


    router.get('/working-on', ticketsController.workingOn);



    return router;
  }
}