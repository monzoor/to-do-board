export interface CategoryProps {
  header: string;
  children: React.ReactNode;
  onDrop: (e: React.DragEvent<HTMLDivElement>, category: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  category: string;
  draggingCategory?: string | ""; // Adjusted to handle empty string
}
