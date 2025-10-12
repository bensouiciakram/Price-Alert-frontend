import api from "./client";
import { AlertMet } from "./types";

export const alertMetService = {
  getAll: async (): Promise<AlertMet[]> => {
    const response = await api.get("/alerts/alerts-met/");
    return response.data;
  },

  getById: async (id: number): Promise<AlertMet> => {
    const response = await api.get(`/alerts/alerts-met/${id}/`);
    return response.data;
  },

  create: async (data: Partial<AlertMet>): Promise<AlertMet> => {
    const response = await api.post("/alerts/alerts-met/", data);
    return response.data;
  },
};
