import { ITicket } from "./ticket";

export interface ICategory extends Document {
  name: string;
  description?: string;
  tickets: ITicket[];
}
