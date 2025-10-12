import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { websiteService } from "../http";

// Query Keys
export const websiteQueryKeys = {
  all: ["websites"] as const,
  byId: (id: number) => ["websites", id] as const,
};

// Website Hooks
export const useWebsites = () => {
  return useQuery({
    queryKey: websiteQueryKeys.all,
    queryFn: websiteService.getAll,
  });
};

export const useCreateWebsite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: websiteService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: websiteQueryKeys.all });
    },
  });
};
