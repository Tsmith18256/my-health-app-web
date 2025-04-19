import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontAwesomeFont = localFont({
  src: [
    {
      path: './fonts/fa-regular-400.woff2',
      style: 'normal',
      weight: '400,'
    },
  ],
  // This is an icon font, shouldn't fallback to a regular font.
  adjustFontFallback: false,
  display: 'block',
  variable: '--font-family-font-awesome'
});

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
      <html lang="en" className={fontAwesomeFont.variable}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
