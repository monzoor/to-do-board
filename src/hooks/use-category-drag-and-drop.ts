import { useState, useEffect, useCallback, useMemo } from "react";
import { useAppSelector } from "@todo/libs/redux/hooks/use-app-selector";
import { selectCategories } from "@todo/libs/redux/slices/categories/selectors/get-categories";
import { Categories } from "@todo/types";
import { ticketApi } from "@todo/app-api/ticket/ticket-api";
import { getCategories } from "@todo/libs/redux/slices/categories/thunks/get-categories";
import { useAppDispatch } from "@todo/libs/redux/hooks/use-app-dispatch";

export const useDragAndDrop = () => {
  const dispatch = useAppDispatch();
  const categoriesItems = useAppSelector(selectCategories) as Categories;

  const [categories, setCategories] = useState<Categories>([]);
  const [draggingCategory, setDraggingCategory] = useState<string | null>(null);

  useEffect(() => {
    setCategories(categoriesItems);
  }, [categoriesItems]);

  // Memoize the categories
  const memoizedCategories = useMemo(() => categories, [categories]);

  const onDragStart = useCallback(
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

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>, targetCategoryId: string) => {
      e.preventDefault();
      const ticketIndex = e.dataTransfer.getData("ticketIndex");
      const sourceCategoryId = e.dataTransfer.getData("sourceCategoryId");

      if (sourceCategoryId === targetCategoryId) return; // Prevent dropping within the same category

      const sourceCategory = memoizedCategories.find(
        (cat) => cat._id === sourceCategoryId,
      );
      const targetCategory = memoizedCategories.find(
        (cat) => cat._id === targetCategoryId,
      );

      if (!sourceCategory || !targetCategory) return;

      const sourceTickets = [...sourceCategory.tickets];
      const [removedTicket] = sourceTickets.splice(parseInt(ticketIndex), 1);
      const targetTickets = [...targetCategory.tickets, removedTicket];

      setCategories(
        memoizedCategories.map((cat) =>
          cat._id === sourceCategoryId
            ? { ...cat, tickets: sourceTickets }
            : cat._id === targetCategoryId
              ? { ...cat, tickets: targetTickets }
              : cat,
        ),
      );
      setDraggingCategory(null);

      try {
        await ticketApi.moveTicket({
          ticketId: removedTicket._id,
          newCategoryId: targetCategoryId,
        });

        // Dispatch getCategories to update categories in the state
        dispatch(getCategories());
      } catch (error) {
        console.error("Error moving ticket or fetching categories:", error);
      }
    },
    [memoizedCategories],
  );

  return {
    categories,
    draggingCategory,
    onDragStart,
    onDragOver,
    onDrop,
  };
};
