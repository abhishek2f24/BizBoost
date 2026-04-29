import type { Metadata } from "next";
import "./globals.css";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { Toaster } from "@/components/ui/use-toast";

export const metadata: Metadata = {
  title: {
    default: "BizBoost AI — Grow Your Business on WhatsApp & Instagram",
    template: "%s | BizBoost AI",
  },
  description:
    "India's #1 AI-powered growth platform for small sellers. Upload your product photo and get your storefront, WhatsApp order page, Instagram creatives, and festival campaigns — all in one place.",
  keywords: [
    "Indian small business",
    "WhatsApp order page",
    "Instagram seller",
    "AI product description",
    "festival campaign",
    "online store India",
    "Meesho alternative",
  ],
  authors: [{ name: "BizBoost AI" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "BizBoost AI",
    title: "BizBoost AI — AI-Powered Growth OS for Indian Sellers",
    description:
      "Upload your product photo → get your storefront, WhatsApp order page, and Instagram creatives in minutes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BizBoost AI",
    description: "India's AI-powered seller growth platform",
  },
  robots: { index: true, follow: true },
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AnalyticsProvider>{children}</AnalyticsProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
