import * as React from "react";
import type { Viewport } from "next";

import "../styles/global.css";
import { Inter } from "next/font/google";

import { UserProvider } from "../contexts/user-context";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "../components/core/theme-provider";

export const viewport = { width: "device-width", initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.ico" sizes="any" />
      </head>
      <body className={inter.variable}>
        <UserProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </UserProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ? process.env.NEXT_PUBLIC_GA_ID : ""} />
    </html>
  );
}
