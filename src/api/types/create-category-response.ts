import { TicketResponse } from "./ticket-response";

export interface CategoryResponse {
  name: string;
  description: string;
  createdAt: string;
  _id: string;
  tickets: TicketResponse[];
}
