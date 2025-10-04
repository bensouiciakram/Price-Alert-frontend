import api from './client';
import { DemoToken } from './types';

// Demo Token Services
export const demoTokenService = {
  // GET /core/tokens/{id}/
  getById: async (id: number): Promise<DemoToken> => {
    const response = await api.get(`/core/tokens/${id}/`);
    return response.data;
  },
};