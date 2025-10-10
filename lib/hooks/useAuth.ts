// src/hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  authService,
  RegisterRequest,
  LoginRequest,
  TokenResponse,
} from "../http/auth";

// Query Keys
export const authQueryKeys = {
  current: ["auth", "current"] as const,
  tokens: ["auth", "tokens"] as const,
};

// Register
export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: () => {
      // optional: invalidate any auth-related queries
      queryClient.invalidateQueries({ queryKey: authQueryKeys.current });
    },
  });
};

// Login (stores tokens)
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<TokenResponse, unknown, LoginRequest>({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (tokens) => {
      localStorage.setItem("authToken", tokens.access);
      localStorage.setItem("refreshToken", tokens.refresh);
      queryClient.invalidateQueries({ queryKey: authQueryKeys.current });
    },
  });
};

// Activate account
export const useActivate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uid, token }: { uid: string; token: string }) =>
      authService.activate(uid, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.current });
    },
  });
};

// Current user
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authQueryKeys.current,
    queryFn: () => authService.getMe(),
    // adjust settings as you like
    staleTime: 60_000,
    retry: false,
  });
};

// Logout
export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      authService.logout(); // removes tokens from storage
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authQueryKeys.current });
      // optional: redirect / do other cleanup in component using this hook
    },
  });
};

export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false; // avoid SSR issues
  const token = localStorage.getItem("authToken");
  return !!token;
};

export const useAuthStatus = () => {
  return useQuery({
    queryKey: authQueryKeys.current,
    queryFn: async () => {
      const token = localStorage.getItem("authToken");
      return { isAuthenticated: !!token };
    },
    staleTime: Infinity,
  });
};
