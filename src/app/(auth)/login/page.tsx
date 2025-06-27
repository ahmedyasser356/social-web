 // src/app/(auth)/login/page.tsx

import LoginForm from "@/app/_components/LoginForm";

 

export const metadata = {
  title: "Login Page - social app",
 icons: {
    icon: "/favicon.png", // or /favicon.png, /my-icon.svg, etc.
    
  },
  description:'the msd you abbo ou jhhn my website social',
};

export default function LoginPage() {
  return <LoginForm />;
}
