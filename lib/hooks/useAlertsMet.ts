import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { alertMetService } from "@/lib";

// 🔑 Query Keys
export const alertMetQueryKeys = {
  all: ["alertsMet"] as const,
  byId: (id: number) => ["alertsMet", id] as const,
  byAlert: (alertId: number) => ["alertsMet", "alert", alertId] as const,
};

// 🔹 Get all triggered alerts (AlertMet)
export const useAlertsMet = () => {
  return useQuery({
    queryKey: alertMetQueryKeys.all,
    queryFn: alertMetService.getAll,
  });
};

// 🔹 Get AlertMet by ID
export const useAlertMetById = (id?: number) => {
  return useQuery({
    queryKey: id ? alertMetQueryKeys.byId(id) : ["alertsMet", "byId", id],
    queryFn: () => alertMetService.getById(id as number),
    enabled: !!id,
  });
};

// 🔹 Create new AlertMet (if you ever create them manually)
export const useCreateAlertMet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: alertMetService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: alertMetQueryKeys.all });
    },
  });
};
