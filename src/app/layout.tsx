import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId="897296947824-atfiae7v18cu6te8svhsvkp6ltbm99m5.apps.googleusercontent.com">
        <body className={inter.className}>{children}</body>
      </GoogleOAuthProvider>
    </html>

  );
}
