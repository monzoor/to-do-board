export interface TicketType {
  title: string;
  description: string;
  assignTo?: string;
  history?: Array<{
    userId: string;
    previousCategory: string;
    newCategory: string;
    historyDate: string;
    _id: string;
    dueDate: string;
  }>;
  category?: string;
  createdAt?: string;
  _id?: string;
  dueDate: string;
}

export interface TicketProps {
  ticket: TicketType;
  index: number;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
    sourceCategoryId: string,
  ) => void;
}
