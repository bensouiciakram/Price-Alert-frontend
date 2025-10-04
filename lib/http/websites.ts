import api from './client';
import { Website } from './types';

// Website Services
export const websiteService = {
  // GET /products/websites/
  getAll: async (): Promise<Website[]> => {
    const response = await api.get('/products/websites/');
    return response.data;
  },

  // POST /products/websites/
  create: async (data: Partial<Website>): Promise<Website> => {
    const response = await api.post('/products/websites/', data);
    return response.data;
  },
};
