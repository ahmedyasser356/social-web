"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Navbar from "./_components/Navbar";
import { Provider } from "react-redux";
import "./globals.css";
import { Container, createTheme } from "@mui/material";
import { store } from "@/libs/store";
import   { Toaster } from 'react-hot-toast';
import '@fortawesome/fontawesome-free/css/all.min.css'
 
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <head>
       <meta name="description" content="Share and discover posts with  ahmed yasser — the best place to connect and post your thoughts." />

      </head>
      <body>
        <div><Toaster/></div>
        <Provider store={store}>
          <AppRouterCacheProvider>
            
             
            <ThemeProvider theme={theme}>
               
              <Navbar></Navbar>

              <Container
                sx={{ position: "relative" ,marginBottom:'30px', marginTop: "100px" }}
                maxWidth={"xl"}
              >
                {children}
              </Container>
            </ThemeProvider>
            
          </AppRouterCacheProvider>
        </Provider>
      </body>
    </html>
  );
}
