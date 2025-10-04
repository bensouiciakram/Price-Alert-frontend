import api from './client';
import { Channel } from './types';

// Channel Services
export const channelService = {
  // GET /alerts/channels/
  getAll: async (): Promise<Channel[]> => {
    const response = await api.get('/alerts/channels/');
    return response.data;
  },

  // POST /alerts/channels/
  create: async (data: Partial<Channel>): Promise<Channel> => {
    const response = await api.post('/alerts/channels/', data);
    return response.data;
  },
};