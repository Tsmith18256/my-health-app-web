import { Outfit } from "next/font/google";
import localFont from "next/font/local";

export const iconFont = localFont({
  // This is an icon font, shouldn't fallback to a regular font.
  adjustFontFallback: false,
  display: "block",
  src: [
    {
      path: "./fa-regular-400.woff2",
      style: "normal",
      weight: "400,",
    },
  ],
  variable: "--font-family-font-awesome",
});

export const defaultFont = Outfit({
  display: "block",
  subsets: ["latin"],
  variable: "--font-family-default",
});
