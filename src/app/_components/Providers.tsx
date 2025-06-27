"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Provider } from "react-redux";
import { store } from "@/libs/store";
import { Toaster } from "react-hot-toast";
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoadingScreen from "./LoadingScreen";
import Cookies from 'js-cookie'
import { usePathname } from "next/navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  let path = usePathname()
  return (
    <Provider store={store}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <Toaster />
          {Cookies.get('token') ||path == '/login' || path=='/register' ?'':<LoadingScreen></LoadingScreen>}
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </Provider>
  );
}
