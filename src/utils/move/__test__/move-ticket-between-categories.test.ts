import { CategoryResponse } from "@todo/app-api/types/create-category-response";
import { Categories } from "@todo/types";
import { moveTicketBetweenCategories } from "../move-ticket-between-categories";

describe("moveTicketBetweenCategories", () => {
  const sourceCategory: CategoryResponse = {
    _id: "sourceCategoryId",
    name: "Source Category",
    description: "Category description",
    createdAt: "2022-01-01",
    userId: "user123",
    tickets: [
      {
        title: "title",
        description: "description",
        assignTo: "assignTo",
        history: [],
        category: "category",
        createdAt: "createdAt",
        _id: "ticket1",
        dueDate: "dueDate",
      },
    ],
  };

  const targetCategory: CategoryResponse = {
    _id: "targetCategoryId",
    name: "Target Category",
    tickets: [],
    description: "",
    createdAt: "",
    userId: "",
  };

  const categories: Categories = [sourceCategory, targetCategory];

  it("should move a ticket from source to target category", () => {
    const ticketIndex = 0;
    const { updatedCategories, removedTicket } = moveTicketBetweenCategories(
      sourceCategory,
      targetCategory,
      ticketIndex,
      categories,
    );

    expect(removedTicket).toEqual(sourceCategory.tickets[ticketIndex]);
    expect(updatedCategories).toEqual([
      { ...sourceCategory, tickets: [] },
      { ...targetCategory, tickets: [removedTicket] },
    ]);
  });

  it("should not modify categories if ticket index is out of bounds", () => {
    const ticketIndex = 1; // Out of bounds
    const { updatedCategories, removedTicket } = moveTicketBetweenCategories(
      sourceCategory,
      targetCategory,
      ticketIndex,
      categories,
    );

    expect(removedTicket).toBeUndefined();
    expect(updatedCategories).toEqual(categories);
  });
});
