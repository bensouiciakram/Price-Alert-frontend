import api from './client';
import { PriceHistory } from './types';

// Price History Services
export const priceHistoryService = {
  // GET /products/prices/
  getAll: async (): Promise<PriceHistory[]> => {
    const response = await api.get('/products/prices/');
    return response.data;
  },

  // POST /products/prices/
  create: async (data: Partial<PriceHistory>): Promise<PriceHistory> => {
    const response = await api.post('/products/prices/', data);
    return response.data;
  },
};