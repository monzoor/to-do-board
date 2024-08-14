export interface CategoryProps {
  header: string;
  children: React.ReactNode;
  onDrop: (e: React.DragEvent<HTMLDivElement>, categoryId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  categoryId: string;
  draggingCategory?: string;
}
