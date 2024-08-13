"use client";

import { useAppSelector } from "@todo/libs/redux/hooks/use-app-selector";
import { getCategories } from "@todo/libs/redux/slices/categories/thunks/get-categories";
import { AppDispatch } from "@todo/libs/redux/types/app-dispatch";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// Define the Ticket type
interface Ticket {
  title: string;
  description: string;
}

// Define the Category type
type CategoryType = "todo" | "inProgress";

// Ticket Component
interface TicketProps {
  ticket: Ticket;
  index: number;
  onDragStart: (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
    sourceCategory: CategoryType,
  ) => void;
}

const Ticket: React.FC<TicketProps> = ({ ticket, index, onDragStart }) => {
  return (
    <div
      className="ticket m-4 bg-white"
      draggable
      onDragStart={(e) => onDragStart(e, index, "todo")}
    >
      <div className="flex flex-col items-start bg-slate-200 p-4">
        <div className="flex-shrink-0 rounded-full bg-red-200 px-3 py-1 text-xs">
          Task Date
        </div>
        <div className="py-3 font-bold">{ticket.title}</div>
        <div className="flex-grow">
          <div className="description text-sm">{ticket.description}</div>
        </div>
      </div>
    </div>
  );
};

// Category Component
interface CategoryProps {
  header: string;
  children: React.ReactNode;
  onDrop: (e: React.DragEvent<HTMLDivElement>, category: CategoryType) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  category: CategoryType;
  draggingCategory?: CategoryType | ""; // Adjusted to handle empty string
}

const Category: React.FC<CategoryProps> = ({
  header,
  children,
  onDrop,
  onDragOver,
  category,
  draggingCategory,
}) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  return (
    <div
      className="category item relative flex min-h-[300px] w-80 flex-col bg-white"
      onDrop={(e) => {
        onDrop(e, category);
        setIsDraggingOver(false);
      }}
      onDragOver={(e) => {
        onDragOver(e);
        handleDragEnter(e);
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      data-category={category}
    >
      <div className="bg-blue-400 p-4 font-bold shadow-md">{header}</div>
      <div className="relative flex-grow">
        {isDraggingOver && draggingCategory !== category && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <span className="text-lg text-white">
              Please drop here your ticket
            </span>
          </div>
        )}
        <div className="relative flex-grow">{children}</div>
      </div>
    </div>
  );
};

// Container Component
export const Container: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [categories, setCategories] = useState<{
    todo: Ticket[];
    inProgress: Ticket[];
  }>({
    todo: [
      {
        title: "Task 1",
        description:
          "Task 1 description Task 1 description Task 1 description Task 1 description Task 1 descriptionTask 1 description",
      },
      { title: "Task 2", description: "Task 2 description" },
      { title: "Task 3", description: "Task 3 description" },
    ],
    inProgress: [{ title: "Task 4", description: "Task 4 description" }],
  });

  const [draggingCategory, setDraggingCategory] = useState<CategoryType | null>(
    null,
  );
  const test = useAppSelector((state) => state.categories.data);

  console.log("test====", test);

  const tt = () => {
    dispatch(getCategories());
  };

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    ticketIndex: number,
    sourceCategory: CategoryType,
  ) => {
    e.dataTransfer.setData("ticketIndex", ticketIndex.toString());
    e.dataTransfer.setData("sourceCategory", sourceCategory);
    setDraggingCategory(sourceCategory); // Set the source category
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetCategory: CategoryType,
  ) => {
    e.preventDefault();
    const ticketIndex = e.dataTransfer.getData("ticketIndex");
    const sourceCategory = e.dataTransfer.getData(
      "sourceCategory",
    ) as CategoryType;

    if (sourceCategory === targetCategory) return; // Prevent dropping within the same category

    if (!categories[sourceCategory] || !categories[targetCategory]) return;

    const sourceTickets = [...categories[sourceCategory]];
    const [removedTicket] = sourceTickets.splice(parseInt(ticketIndex), 1);
    const targetTickets = [...categories[targetCategory], removedTicket];

    setCategories({
      ...categories,
      [sourceCategory]: sourceTickets,
      [targetCategory]: targetTickets,
    });
    setDraggingCategory(null); // Reset the dragging category after drop
  };

  return (
    <div className="container mx-auto overflow-hidden py-10 pl-5">
      <div className="flex items-start gap-6 overflow-auto">
        <Category
          header="TODO"
          onDrop={onDrop}
          onDragOver={onDragOver}
          category="todo"
          draggingCategory={draggingCategory || ""} // Pass the current dragging category
        >
          {categories.todo.map((ticket, index) => (
            <Ticket
              key={index}
              ticket={ticket}
              index={index}
              onDragStart={(e) => onDragStart(e, index, "todo")}
            />
          ))}
        </Category>
        <Category
          header="In Progress"
          onDrop={onDrop}
          onDragOver={onDragOver}
          category="inProgress"
          draggingCategory={draggingCategory || ""} // Pass the current dragging category
        >
          {categories.inProgress.map((ticket, index) => (
            <Ticket
              key={index}
              ticket={ticket}
              index={index}
              onDragStart={(e) => onDragStart(e, index, "inProgress")}
            />
          ))}
        </Category>
      </div>
    </div>
  );
};
