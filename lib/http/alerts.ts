import api from "./client";
import { Alert } from "./types";

// Alert Services
export const alertService = {
  // GET /alerts/alerts/
  getAll: async (): Promise<Alert[]> => {
    const response = await api.get("/alerts/alerts/");
    return response.data;
  },

  // POST /alerts/alerts/
  create: async (data: Partial<Alert>): Promise<Alert> => {
    const response = await api.post("/alerts/alerts/", data);
    return response.data;
  },
  // PATCH /alerts/alerts/:id/
  update: async (id: number, data: Partial<Alert>): Promise<Alert> => {
    const response = await api.patch(`/alerts/alerts/${id}/`, data);
    return response.data;
  },
  // GET /alerts/alerts/:id/
  getById: async (id: number): Promise<Alert> => {
    const response = await api.get(`/alerts/alerts/${id}/`);
    return response.data;
  },
  // GET /alerts/alerts/?product=:productId  -> returns first alert for product or null
};
