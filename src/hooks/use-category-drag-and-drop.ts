import { useState, useEffect, useCallback, useMemo } from "react";
import { useAppSelector } from "@todo/libs/redux/hooks/use-app-selector";
import { selectCategories } from "@todo/libs/redux/slices/categories/selectors/get-categories";
import { Categories } from "@todo/types";
import { ticketApi } from "@todo/app-api/ticket/ticket-api";
import { getCategories } from "@todo/libs/redux/slices/categories/thunks/get-categories";
import { useAppDispatch } from "@todo/libs/redux/hooks/use-app-dispatch";
import { moveTicketBetweenCategories } from "@todo/utils";
import { UseCategoryDragAndDropReturn } from "./types";

const findCategoryById = (categoryId: string, categories: Categories) => {
  return categories.find((cat) => cat._id === categoryId);
};

export const useDragAndDrop = (): UseCategoryDragAndDropReturn => {
  const dispatch = useAppDispatch();
  const categoriesItems = useAppSelector(selectCategories) as Categories;

  const [categories, setCategories] = useState<Categories>([]);
  const [draggingCategory, setDraggingCategory] = useState<string | null>(null);

  useEffect(() => {
    setCategories(categoriesItems);
  }, [categoriesItems]);

  // Memoize the categories
  const memoizedCategories = useMemo(() => categories, [categories]);

  const handleDragStart = useCallback(
    (
      e: React.DragEvent<HTMLDivElement>,
      ticketIndex: number,
      sourceCategoryId: string,
    ) => {
      e.dataTransfer.setData("ticketIndex", ticketIndex.toString());
      e.dataTransfer.setData("sourceCategoryId", sourceCategoryId);
      setDraggingCategory(sourceCategoryId);
    },
    [],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>, targetCategoryId: string) => {
      e.preventDefault();
      const ticketIndex = e.dataTransfer.getData("ticketIndex");
      const sourceCategoryId = e.dataTransfer.getData("sourceCategoryId");

      if (sourceCategoryId === targetCategoryId) return; // Prevent dropping within the same category

      const sourceCategory = findCategoryById(
        sourceCategoryId,
        memoizedCategories,
      );
      const targetCategory = findCategoryById(
        targetCategoryId,
        memoizedCategories,
      );

      if (!sourceCategory || !targetCategory) return;

      const { updatedCategories, removedTicket } = moveTicketBetweenCategories(
        sourceCategory,
        targetCategory,
        parseInt(ticketIndex),
        memoizedCategories,
      );

      setCategories(updatedCategories);
      setDraggingCategory(null);

      try {
        await ticketApi.moveTicket({
          ticketId: removedTicket._id,
          newCategoryId: targetCategoryId,
        });

        // Dispatch getCategories to update categories in the state
        dispatch(getCategories());
      } catch (error) {
        console.error("Error moving ticket or fetching categories:");
      }
    },
    [memoizedCategories, dispatch],
  );

  return {
    categories,
    draggingCategory,
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
  };
};
