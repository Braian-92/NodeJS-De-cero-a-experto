import { Request, Response } from "express";
import { TicketService } from "../service/ticket.service";




export class TicketsController {



  //! DI - WssService
  constructor(
    private readonly ticketService = new TicketService(),
  ) {}

  public getTickets = async (req: Request, res: Response) => {
    res.json( this.ticketService.tickets );
  }

  public getLastTicketNumber = async (req: Request, res: Response) => {
    res.json( this.ticketService.lastTicketNumber );
  }

  public pendingTickets = async (req: Request, res: Response) => {
    res.json( this.ticketService.pendingTickets );
  }

  public createTicket = async (req: Request, res: Response) => {
    res.status(201).json( this.ticketService.createTicket() );
  }

  public drawTicket = async (req: Request, res: Response) => {
    const { desk } = req.params;
    res.json( this.ticketService.drawTickets(desk) );
  }

  public ticketFinished = async (req: Request, res: Response) => {
    const { ticketId } = req.params;
    res.json( this.ticketService.onFinishTicket(ticketId) );
  }

  public workingOn = async (req: Request, res: Response) => {
    res.json( this.ticketService.lastWorkingOnTickets );
  }

}