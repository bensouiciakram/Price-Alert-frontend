import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { alertService, Alert } from "../http";

// Query Keys
export const alertQueryKeys = {
  all: ["alerts"] as const,
  byId: (id: number) => ["alerts", id] as const,
};

// Alert Hooks
export const useAlerts = () => {
  return useQuery({
    queryKey: alertQueryKeys.all,
    queryFn: alertService.getAll,
  });
};

export const useAlertById = (id?: number) => {
  return useQuery({
    queryKey: id ? alertQueryKeys.byId(id) : (["alerts", "byId", id] as const),
    queryFn: () => alertService.getById(id as number),
    enabled: !!id,
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

export const useUpdateAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Alert> }) =>
      alertService.update(id, data),
    onSuccess: (_: Alert, variables: { id: number; data: Partial<Alert> }) => {
      queryClient.invalidateQueries({ queryKey: alertQueryKeys.all });
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: alertQueryKeys.byId(variables.id),
        });
      }
    },
  });
};
