import { ICreateTicketFormInputs } from "../../create-ticket/types/create-ticket";

export interface IUpdateTicketFormInputs extends ICreateTicketFormInputs {
  ticketId: string;
}
