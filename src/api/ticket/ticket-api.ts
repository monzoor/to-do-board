import { api } from "@todo/libs";
import { APIResponse, TicketResponse } from "../types";

export const ticketApi = {
  moveTicket: async ({
    ticketId,
    newCategoryId,
  }: {
    ticketId: string;
    newCategoryId: string;
  }) => {
    try {
      const response = await api.post<APIResponse<TicketResponse>>("/move", {
        ticketId,
        newCategoryId,
      });
      return response.data.data;
    } catch (error) {
      console.error("Move ticket error:", error);
      throw error;
    }
  },
};
