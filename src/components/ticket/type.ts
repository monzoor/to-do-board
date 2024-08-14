export interface TicketProps {
  ticket: {
    title: string;
    description: string;
    assignTo?: string;
    history?: Array<{
      userId: string;
      previousCategory: string;
      newCategory: string;
      historyDate: string;
      _id: string;
    }>;
    category?: string;
    createdAt?: string;
    _id?: string;
  };
  index: number;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
    sourceCategoryId: string,
  ) => void;
}
