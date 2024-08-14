"use client";

import { CategoryCard, Ticket } from "@todo/components";
import { useAppSelector } from "@todo/libs/redux/hooks/use-app-selector";
import { selectCategories } from "@todo/libs/redux/slices/categories/selectors/get-categories";
import { Categories } from "@todo/types/category";
import React, { useEffect, useState } from "react";

export const Container: React.FC = () => {
  const categoriesItems = useAppSelector(selectCategories) as Categories;

  const [categories, setCategories] = useState<Categories>([]);

  useEffect(() => {
    setCategories(categoriesItems);
  }, [categoriesItems]);

  const [draggingCategory, setDraggingCategory] = useState<string | null>(null);

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    ticketIndex: number,
    sourceCategoryId: string,
  ) => {
    e.dataTransfer.setData("ticketIndex", ticketIndex.toString());
    e.dataTransfer.setData("sourceCategoryId", sourceCategoryId);
    setDraggingCategory(sourceCategoryId);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetCategoryId: string,
  ) => {
    e.preventDefault();
    const ticketIndex = e.dataTransfer.getData("ticketIndex");
    const sourceCategoryId = e.dataTransfer.getData("sourceCategoryId");

    if (sourceCategoryId === targetCategoryId) return; // Prevent dropping within the same category

    const sourceCategory = categories.find(
      (cat) => cat._id === sourceCategoryId,
    );
    const targetCategory = categories.find(
      (cat) => cat._id === targetCategoryId,
    );

    if (!sourceCategory || !targetCategory) return;

    const sourceTickets = [...sourceCategory.tickets];
    const [removedTicket] = sourceTickets.splice(parseInt(ticketIndex), 1);
    const targetTickets = [...targetCategory.tickets, removedTicket];

    setCategories(
      categories.map((cat) =>
        cat._id === sourceCategoryId
          ? { ...cat, tickets: sourceTickets }
          : cat._id === targetCategoryId
            ? { ...cat, tickets: targetTickets }
            : cat,
      ),
    );
    setDraggingCategory(null);
  };

  return (
    <div className="container mx-auto overflow-hidden py-10 pl-5">
      <div className="flex items-start gap-6 overflow-auto">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            header={category.name.toUpperCase()}
            onDrop={onDrop}
            onDragOver={onDragOver}
            categoryId={category._id}
            draggingCategory={draggingCategory || ""}
          >
            {category.tickets.map((ticket, index) => (
              <Ticket
                key={ticket._id}
                ticket={ticket}
                index={index}
                onDragStart={(e) => onDragStart(e, index, category._id)}
              />
            ))}
          </CategoryCard>
        ))}
      </div>
    </div>
  );
};
