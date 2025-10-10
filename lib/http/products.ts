import api from "./client";
import { Product, AddProductRequest, ApiResponse } from "./types";

// Product Services
export const productService = {
  // GET /products/products/
  getAll: async (): Promise<Product[]> => {
    const response = await api.get("/products/products/");
    return response.data;
  },

  // GET /products/products/{id}/
  getById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/products/${id}/`);
    return response.data;
  },

  // POST /products/products/
  create: async (data: Partial<Product>): Promise<Product> => {
    const response = await api.post("/products/products/", data);
    return response.data;
  },

  // PUT /products/products/{id}/
  update: async (id: number, data: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/products/products/${id}/`, data);
    return response.data;
  },

  // DELETE /products/products/{id}/
  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/products/${id}/`);
  },

  // POST /products/add-product/
  addProduct: async (data: AddProductRequest): Promise<ApiResponse<null>> => {
    const response = await api.post("/products/add-product/", data);
    return response.data;
  },
};
