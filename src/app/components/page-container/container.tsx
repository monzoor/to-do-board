"use client";

import { useDragAndDrop } from "@todo/hooks/use-category-drag-and-drop";
import { CategoryCard } from "../category";
import { Ticket } from "../ticket";

export const Container: React.FC = () => {
  const {
    categories,
    draggingCategory,
    onDragStart,
    onDragOver,
    onDrop,
    getStatus,
  } = useDragAndDrop();

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
                getStatus={getStatus}
              />
            ))}
          </CategoryCard>
        ))}
      </div>
    </div>
  );
};
