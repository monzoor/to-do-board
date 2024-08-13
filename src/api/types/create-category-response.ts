import { Ticket } from "./ticket-respone";

export interface CategoryResponse {
  name: string;
  description: string;
  createdAt: Date;
  _id: string;
  tickets: Ticket[];
}
