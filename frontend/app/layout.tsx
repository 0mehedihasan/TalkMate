import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

// Google AdSense publisher ID. The account is verified on edsol.academy (AdSense
// only accepts the root domain); ads are shown on this site only. Auto ads are
// placed by Google; consent for the EEA, UK and Switzerland comes from Google's
// own consent message (AdSense > Privacy & messaging), which this script loads.
const ADSENSE_CLIENT = "ca-pub-7059764586079379";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  category: "education",
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US", title: SITE_TITLE, description: SITE_DESCRIPTION },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  // Google Search Console "HTML tag" verification code (optional)
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  other: { "google-adsense-account": ADSENSE_CLIENT },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0D0E17" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* A plain async tag: next/script adds a data-nscript attribute AdSense warns about. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
