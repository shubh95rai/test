import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import MobileNav from "@/components/MobileNav";
import DesktopNav from "@/components/DesktopNav";
import React from "react";
import { ThemeProvider } from "@/components/ThemeProvider";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased dark:bg-neutral-900`}>
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {modal}
          <div className="flex">
            <DesktopNav />
            <div className="w-full px-4 py-6">{children}</div>
          </div>
          <MobileNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
