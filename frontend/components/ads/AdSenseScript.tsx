import Script from "next/script";

// Loads the AdSense library once for the whole site. Render it in app/layout.tsx.
// Does nothing until NEXT_PUBLIC_ADSENSE_CLIENT is set (e.g. "ca-pub-1234567890123456").
export function AdSenseScript() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return null;
  return (
    <Script
      id="adsense-loader"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}
