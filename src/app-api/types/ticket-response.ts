import { History } from "./history-response";

export interface TicketResponse {
  title: string;
  description: string;
  assignTo: string;
  history: History[];
  category: string;
  createdAt: string;
  _id: string;
  dueDate: string;
}
