"use client";

import { TicketProps } from "./type";

export const Ticket: React.FC<TicketProps> = ({
  ticket,
  index,
  onDragStart,
  getStatus,
}) => {
  const status = getStatus(ticket.dueDate)?.status;
  const color = getStatus(ticket.dueDate)?.color;

  return (
    <div
      className="ticket mb-2 bg-white"
      draggable
      onDragStart={(e) => onDragStart(e, index, ticket.category || "")}
    >
      <div className="flex flex-col items-start bg-slate-200 p-4">
        <div
          className={`flex-shrink-0 rounded-full ${color} px-3 py-1 text-xs`}
        >
          {status}
        </div>
        <div className="py-3 font-bold">{ticket.title}</div>
        <div className="flex-grow">
          <div className="line-clamp-2 text-sm">{ticket.description}</div>
        </div>
      </div>
    </div>
  );
};
