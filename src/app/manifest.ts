import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#FFFFFF",
    description: "So many gainz",
    display: "standalone",
    icons: [
      {
        sizes: "72x72",
        src: "/icons/icon-72.png",
        type: "image/png",
      },
      {
        sizes: "128x128",
        src: "/icons/icon-128.png",
        type: "image/png",
      },
      {
        sizes: "144x144",
        src: "/icons/icon-144.png",
        type: "image/png",
      },
      {
        sizes: "192x192",
        src: "/icons/icon-192.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "/icons/icon-512.png",
        type: "image/png",
      },
    ],
    name: "Cool Fitness App",
    short_name: "FitnessApp",
    start_url: "/",
    theme_color: "#FF8904",
  };
}
