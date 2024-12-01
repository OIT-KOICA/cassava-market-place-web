"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { redirect, usePathname } from "next/navigation";
import React from "react";

const QueryProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false, // Ne pas réessayer automatiquement les requêtes
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
              if (error?.response?.status === 401 && pathname != "/") {
                console.log("Token expiré, redirection en cours...");
                redirect("/"); // Redirige automatiquement
              }
            },
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProviderWrapper;
