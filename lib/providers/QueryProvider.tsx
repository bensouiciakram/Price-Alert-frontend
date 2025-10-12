"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { useState } from "react";

interface QueryProviderProps {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            // Assuming all errors are AxiosError
            retry: (failureCount: number, error: unknown) => {
              const axiosError = error as AxiosError;
              const status = axiosError?.response?.status;

              if (status && status >= 400 && status < 500) {
                // Retry only on 408 (Request Timeout) or 429 (Too Many Requests)
                if (status === 408 || status === 429) return failureCount < 3;
                return false;
              }

              return failureCount < 3; // Retry other errors up to 3 times
            },
          },
          mutations: {
            retry: (failureCount: number, error: unknown) => {
              const axiosError = error as AxiosError;
              const status = axiosError?.response?.status;

              if (status && status >= 400 && status < 500) {
                return false; // Don't retry client errors
              }

              return failureCount < 2; // Retry server/network errors up to 2 times
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
