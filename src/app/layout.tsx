import type { Metadata } from "next";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { iconFont } from '@/app/fonts/fonts';

export const metadata: Metadata = {
  title: "Cool fitness app",
  description: "So many gainz",
};

export const fontsClassName = `${iconFont.variable}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={fontsClassName}>
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
