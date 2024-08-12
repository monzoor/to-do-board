"use client";

import React, { useState } from "react";

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
          <div className="text-sm">{ticket.description}</div>
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
}

const Category: React.FC<CategoryProps> = ({
  header,
  children,
  onDrop,
  onDragOver,
  category,
}) => {
  return (
    <div
      className="category item w-80 bg-white"
      onDrop={(e) => onDrop(e, category)}
      onDragOver={onDragOver}
      data-category={category}
    >
      <div className="bg-blue-400 p-4 font-bold shadow-md">{header}</div>
      <div>{children}</div>
    </div>
  );
};

// Container Component
export const Container: React.FC = () => {
  const [categories, setCategories] = useState<{
    todo: Ticket[];
    inProgress: Ticket[];
  }>({
    todo: [
      { title: "Task 1", description: "Task 1 description" },
      { title: "Task 2", description: "Task 2 description" },
      { title: "Task 3", description: "Task 3 description" },
    ],
    inProgress: [{ title: "Task 4", description: "Task 4 description" }],
  });

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    ticketIndex: number,
    sourceCategory: CategoryType,
  ) => {
    e.dataTransfer.setData("ticketIndex", ticketIndex.toString());
    e.dataTransfer.setData("sourceCategory", sourceCategory);
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
  };

  return (
    <div className="container mx-auto overflow-hidden py-10 pl-5">
      <div className="flex items-start gap-6 overflow-auto">
        <Category
          header="TODO"
          onDrop={onDrop}
          onDragOver={onDragOver}
          category="todo"
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
