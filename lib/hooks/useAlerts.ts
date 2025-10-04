import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { alertService, Alert } from '../http';

// Query Keys
export const alertQueryKeys = {
  all: ['alerts'] as const,
  byId: (id: number) => ['alerts', id] as const,
};

// Alert Hooks
export const useAlerts = () => {
  return useQuery({
    queryKey: alertQueryKeys.all,
    queryFn: alertService.getAll,
  });
};

export const useCreateAlert = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: alertService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: alertQueryKeys.all });
    },
  });
};