import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { priceHistoryService, PriceHistory } from '../http';

// Query Keys
export const priceHistoryQueryKeys = {
  all: ['priceHistory'] as const,
};

// Price History Hooks
export const usePriceHistory = () => {
  return useQuery({
    queryKey: priceHistoryQueryKeys.all,
    queryFn: priceHistoryService.getAll,
  });
};

export const useCreatePriceHistory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: priceHistoryService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: priceHistoryQueryKeys.all });
    },
  });
};