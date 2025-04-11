import localFont from "next/font/local";

// Next doesn't allow you to pass a variable to the CSS `variable` parameter of
// `localFont`. So we can't avoid duplicating the string below, but passing the
// `typeof ICON_FONT_VARABLE` to the generic will throw an error if they get out
// of sync.
export const iconFont = localFont({
  src: [
    {
      path: './fa-regular-400.woff2',
    },
    {
      path: './fa-regular-400.woff',
    },
    {
      path: './fa-regular-400.ttf',
    },
  ],
  // This is an icon font, shouldn't fallback to a regular font.
  adjustFontFallback: false,
  display: 'block',
  style: 'normal',
  variable: '--font-family-font-awesome',
  weight: '400'
});
