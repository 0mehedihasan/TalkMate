// Pages that need a login (or are forms) are kept out of search results; robots.ts also tells crawlers not to visit them.
const PRIVATE = [
  "/dashboard", "/admin", "/chat", "/call", "/sentence", "/word", "/dialogue", "/roleplay",
  "/characters", "/debate", "/photo", "/flashcards", "/login", "/forgot-password",
  "/reset-password", "/complete-profile",
];

/** @type {import("next").NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return PRIVATE.flatMap((p) => [p, `${p}/:path*`]).map((source) => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }));
  },
};
export default nextConfig;
