import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService, Product, AddProductRequest } from '../http';

// Query Keys
export const productQueryKeys = {
  all: ['products'] as const,
  byId: (id: number) => ['products', id] as const,
};

// Product Hooks
export const useProducts = () => {
  return useQuery({
    queryKey: productQueryKeys.all,
    queryFn: productService.getAll,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: productQueryKeys.byId(id),
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) =>
      productService.update(id, data),
    onSuccess: (_: Product, variables: { id: number; data: Partial<Product> }) => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.byId(variables.id) });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
    },
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: AddProductRequest) => productService.addProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productQueryKeys.all });
    },
  });
};