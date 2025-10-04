import api from './client';
import { Alert } from './types';

// Alert Services
export const alertService = {
  // GET /alerts/alerts/
  getAll: async (): Promise<Alert[]> => {
    const response = await api.get('/alerts/alerts/');
    return response.data;
  },

  // POST /alerts/alerts/
  create: async (data: Partial<Alert>): Promise<Alert> => {
    const response = await api.post('/alerts/alerts/', data);
    return response.data;
  },
};