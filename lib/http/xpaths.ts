import api from './client';
import { Xpath, AddScraperRequest, ApiResponse } from './types';

// Xpath Services
export const xpathService = {
  // GET /products/xpaths/
  getAll: async (): Promise<Xpath[]> => {
    const response = await api.get('/products/xpaths/');
    return response.data;
  },

  // POST /products/xpaths/
  create: async (data: Partial<Xpath>): Promise<Xpath> => {
    const response = await api.post('/products/xpaths/', data);
    return response.data;
  },

  // PUT /products/xpaths/{id}/
  update: async (id: number, data: Partial<Xpath>): Promise<Xpath> => {
    const response = await api.put(`/products/xpaths/${id}/`, data);
    return response.data;
  },

  // POST /products/add-scraper/
  addScraper: async (data: AddScraperRequest): Promise<ApiResponse<null>> => {
    const response = await api.post('/products/add-scraper/', data);
    return response.data;
  },
};