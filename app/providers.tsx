"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Bounce, ToastContainer } from "react-toastify";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <ToastContainer
        closeOnClick
        draggable
        pauseOnFocusLoss
        pauseOnHover
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        position="top-right"
        rtl={false}
        theme="light"
        transition={Bounce}
      />
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
