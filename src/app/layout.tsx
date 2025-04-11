import type { Metadata } from "next";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { FONTS_CLASS_NAME } from '@/app/fonts/fonts';

export const metadata: Metadata = {
  title: "Cool fitness app",
  description: "So many gainz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={FONTS_CLASS_NAME}>
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
