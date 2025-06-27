 // ✅ No "use client"
import "./globals.css";
import { Roboto } from "next/font/google";
 
import Navbar from "./_components/Navbar";
import LoadingScreen from "./_components/LoadingScreen";
import { Container } from "@mui/material";
import { cookies } from "next/headers";
import { usePathname } from "next/navigation";
import Providers from "./_components/Providers";



export const metadata = {
  title: "social web",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <Container sx={{ position: "relative", marginBottom: "30px", marginTop: "100px" }} maxWidth={"xl"}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
