import { ticketSchema } from "@todo/schema/ticket/ticket-schema";
import { ITicket } from "@todo/types/ticket";
import mongoose, { Model } from "mongoose";

const Ticket: Model<ITicket> =
  mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", ticketSchema);

export default Ticket;
