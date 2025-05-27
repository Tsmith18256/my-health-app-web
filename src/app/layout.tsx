import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { defaultFont, iconFont } from "@/app/fonts/fonts";
import "./globals.css";

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
      <html lang="en" className={`${defaultFont.className} ${iconFont.variable}`}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
