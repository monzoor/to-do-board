import { Ticket } from "./ticket-respone";

export interface CategoryResponse {
  name: string;
  description: string;
  createdAt: string;
  _id: string;
  tickets: Ticket[];
}
