import api from "./client";
import { LastPrice, LastPriceRequest, PriceHistory } from "./types";

// Price History Services
export const priceHistoryService = {
  // GET /products/prices/
  getAll: async (): Promise<PriceHistory[]> => {
    const response = await api.get("/products/prices/");
    return response.data;
  },

  // POST /products/prices/
  create: async (data: Partial<PriceHistory>): Promise<PriceHistory> => {
    const response = await api.post("/products/prices/", data);
    return response.data;
  },

  // POST /products/prices/latest_price/
  getLastPrice: async (data: LastPriceRequest): Promise<LastPrice> => {
    const response = await api.post("/products/prices/latest_price/", data);
    return response.data;
  },
};
