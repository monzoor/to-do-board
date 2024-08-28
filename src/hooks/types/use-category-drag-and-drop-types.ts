import { Categories } from "@todo/types/category";

export interface UseCategoryDragAndDropReturn {
  categories: Categories;
  draggingCategory: string | null;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    ticketIndex: number,
    sourceCategoryId: string,
  ) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (
    e: React.DragEvent<HTMLDivElement>,
    targetCategoryId: string,
  ) => Promise<void>;
}
