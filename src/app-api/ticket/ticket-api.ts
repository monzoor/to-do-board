import { api } from "@todo/libs";
import { APIResponse, TicketResponse } from "../types";
import { API_URLS } from "@todo/contants";
import { IUpdateTicketFormInputs } from "@todo/app/components/ticket-details/types/update-ticket";
import { ICreateTicketFormInputs } from "@todo/app/components/create-ticket/types/create-ticket";

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
      console.error("Move ticket error:");
      throw error;
    }
  },
  createTicket: async ({
    title,
    description,
    category,
    dueDate,
  }: ICreateTicketFormInputs) => {
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
  },
  updateTicket: async ({
    ticketId,
    title,
    description,
    category,
    dueDate,
  }: IUpdateTicketFormInputs) => {
    const response = await api.patch<APIResponse<TicketResponse>>(
      API_URLS.TICKET_UPDATE,
      {
        ticketId,
        title,
        description,
        category,
        dueDate,
      },
    );
    return response.data;
  },
};
