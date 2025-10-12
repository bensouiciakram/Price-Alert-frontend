import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCurrencies,
  createCurrency,
  updateCurrency,
  deleteCurrency,
} from "@/lib";
import type { Currency } from "@/lib";

// Query keys
const CURRENCY_KEYS = {
  all: ["currencies"] as const,
  detail: (id: number) => [...CURRENCY_KEYS.all, id] as const,
};

// ✅ Get all currencies
export const useCurrencies = () => {
  return useQuery({
    queryKey: CURRENCY_KEYS.all,
    queryFn: getCurrencies,
  });
};

// ✅ Create currency
export const useCreateCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCurrency,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CURRENCY_KEYS.all });
    },
  });
};

// ✅ Update currency
export const useUpdateCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Currency> }) =>
      updateCurrency(id, data),
    onSuccess: (updatedCurrency) => {
      queryClient.invalidateQueries({ queryKey: CURRENCY_KEYS.all });
    },
  });
};

// ✅ Delete currency
export const useDeleteCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCurrency,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CURRENCY_KEYS.all });
    },
  });
};
