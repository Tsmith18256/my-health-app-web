import localFont from 'next/font/local';

export const iconFont = localFont({
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
