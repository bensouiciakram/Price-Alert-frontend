import { useQuery } from '@tanstack/react-query';
import { demoTokenService } from '../http';

// Query Keys
export const demoTokenQueryKeys = {
  byId: (id: number) => ['demoToken', id] as const,
};

// Demo Token Hooks
export const useDemoToken = (id: number) => {
  return useQuery({
    queryKey: demoTokenQueryKeys.byId(id),
    queryFn: () => demoTokenService.getById(id),
    enabled: !!id,
  });
};