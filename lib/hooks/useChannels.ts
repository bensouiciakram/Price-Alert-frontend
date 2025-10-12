import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { channelService } from "../http";

// Query Keys
export const channelQueryKeys = {
  all: ["channels"] as const,
  byId: (id: number) => ["channels", id] as const,
};

// Channel Hooks
export const useChannels = () => {
  return useQuery({
    queryKey: channelQueryKeys.all,
    queryFn: channelService.getAll,
  });
};

export const useCreateChannel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: channelService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: channelQueryKeys.all });
    },
  });
};
