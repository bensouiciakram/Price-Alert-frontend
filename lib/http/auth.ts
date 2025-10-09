import api from "./client";
import { LoginRequest, RegisterRequest, TokenResponse } from "./types";

export const authService = {
  // Register a new user
  register: async (data: RegisterRequest) => {
    const response = await api.post("/auth/users/", data);
    return response.data;
  },

  // Activate a user account
  activate: async (uid: string, token: string) => {
    const response = await api.post("/auth/users/activation/", { uid, token });
    return response.data;
  },

  // Login and get JWT tokens
  login: async (data: LoginRequest): Promise<TokenResponse> => {
    const response = await api.post("/auth/jwt/create/", data);
    return response.data;
  },

  // Refresh access token
  refresh: async (refresh: string): Promise<TokenResponse> => {
    const response = await api.post("/auth/jwt/refresh/", { refresh });
    return response.data;
  },

  // Get current user info
  getMe: async () => {
    const response = await api.get("/auth/users/me/");
    return response.data;
  },

  // Logout (optional, if you invalidate refresh tokens)
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
  },
};

export type { RegisterRequest, LoginRequest, TokenResponse };
