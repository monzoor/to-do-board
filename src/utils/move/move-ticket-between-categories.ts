import { Categories } from "@todo/types";

export const moveTicketBetweenCategories = (
  sourceCategory: any,
  targetCategory: any,
  ticketIndex: number,
  categories: Categories,
) => {
  const sourceTickets = [...sourceCategory.tickets];
  const [removedTicket] = sourceTickets.splice(ticketIndex, 1);
  const targetTickets = [...targetCategory.tickets, removedTicket];

  const updatedCategories = categories.map((cat) =>
    cat._id === sourceCategory._id
      ? { ...cat, tickets: sourceTickets }
      : cat._id === targetCategory._id
        ? { ...cat, tickets: targetTickets }
        : cat,
  );

  return { updatedCategories, removedTicket };
};
