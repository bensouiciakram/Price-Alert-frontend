import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { priceHistoryService } from "../http";

// Query Keys
export const priceHistoryQueryKeys = {
  all: ["priceHistory"] as const,
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

export const useLastPrice = (productId: number) => {
  return useQuery({
    queryKey: ["lastPrice", productId],
    queryFn: () => priceHistoryService.getLastPrice({ product_id: productId }),
    enabled: productId !== undefined,
  });
};
