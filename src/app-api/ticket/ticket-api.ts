import { api } from "@todo/libs";
import { APIResponse, TicketResponse } from "../types";
import { handleError } from "@todo/utils";
import { API_URLS } from "@todo/contants";

export const ticketApi = {
  moveTicket: async ({
    ticketId,
    newCategoryId,
  }: {
    ticketId: string;
    newCategoryId: string;
  }) => {
    try {
      const response = await api.post<APIResponse<TicketResponse>>(
        API_URLS.MOVE,
        {
          ticketId,
          newCategoryId,
        },
      );
      return response.data.data;
    } catch (error) {
      console.error("Move ticket error:", error);
      throw error;
    }
  },
  createTicket: async ({
    title,
    description,
    category,
    dueDate,
  }: {
    title: string;
    description: string;
    category: string;
    dueDate: string;
  }) => {
    try {
      const response = await api.post<APIResponse<TicketResponse>>(
        API_URLS.TICKET,
        {
          title,
          description,
          category,
          dueDate,
        },
      );
      return response.data.data;
    } catch (error) {
      console.error("Create ticket error:", error);
      return handleError(error);
    }
  },
  updateTicket: async ({
    ticketId,
    title,
    description,
    category,
    dueDate,
  }: {
    ticketId: string;
    title: string;
    description: string;
    category: string;
    dueDate: string;
  }) => {
    try {
      const response = await api.patch<APIResponse<TicketResponse>>(
        API_URLS.TICKET,
        {
          ticketId,
          title,
          description,
          category,
          dueDate,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Update ticket error:", error);
      return handleError(error);
    }
  },
};
