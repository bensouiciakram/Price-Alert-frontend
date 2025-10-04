import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { xpathService, Xpath, AddScraperRequest } from '../http';

// Query Keys
export const xpathQueryKeys = {
  all: ['xpaths'] as const,
  byId: (id: number) => ['xpaths', id] as const,
};

// Xpath Hooks
export const useXpaths = () => {
  return useQuery({
    queryKey: xpathQueryKeys.all,
    queryFn: xpathService.getAll,
  });
};

export const useCreateXpath = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: xpathService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: xpathQueryKeys.all });
    },
  });
};

export const useUpdateXpath = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Xpath> }) =>
      xpathService.update(id, data),
    onSuccess: (_: Xpath, variables: { id: number; data: Partial<Xpath> }) => {
      queryClient.invalidateQueries({ queryKey: xpathQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: xpathQueryKeys.byId(variables.id) });
    },
  });
};

export const useAddScraper = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: AddScraperRequest) => xpathService.addScraper(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: xpathQueryKeys.all });
    },
  });
};