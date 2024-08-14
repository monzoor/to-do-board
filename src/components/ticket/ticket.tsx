"use client";

import { TicketProps } from "./type";

export const Ticket: React.FC<TicketProps> = ({
  ticket,
  index,
  onDragStart,
}) => {
  return (
    <div
      className="ticket m-4 bg-white"
      draggable
      onDragStart={(e) => onDragStart(e, index, ticket.category || "")}
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
