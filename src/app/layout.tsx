import type { Metadata } from "next";
import { Navbar as NavBar } from "@/components/navbar"
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { AuthWrapper } from "@/components/auth/auth-wrapper"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chase Houser",
  description: "Designed and developed by Chase Houser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthWrapper>
          <NavBar/>
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            {children}
            <Analytics />
          </main>
        </AuthWrapper>
      </body>
    </html>
  );
}
