export interface TicketProps {
  ticket: {
    title: string;
    description: string;
  };
  index: number;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
    sourceCategory: string,
  ) => void;
}
