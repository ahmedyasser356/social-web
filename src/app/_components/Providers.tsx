"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Provider } from "react-redux";
import { store } from "@/libs/store";
import { Toaster } from "react-hot-toast";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <Toaster />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </Provider>
  );
}
