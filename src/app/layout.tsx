import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // deve essere qui, non dentro page.tsx

export const dynamic = "force-dynamic";
import ReduxProvider from "@/components/ReduxProvider";
import { LenisProvider } from "@/providers/LenisProvider";
import AppWrapper from "@/components/AppWrapper";

import GradientBackground from "@/components/GradientBackground";
import { ThemeScript } from "@/components/ThemeScript";

const inter = Inter({ subsets: ["latin"] });

// Esporta viewport separatamente
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// Metadata senza viewport
export const metadata: Metadata = {
  title: "Antonio Rinaldi – Web & Mobile Developer",
  description:
    "Personal portfolio of Antonio Rinaldi, Computer Engineer specializing in React, Next.js, AI, and Computer Vision.",
  keywords: [
    "Antonio Rinaldi",
    "Web Developer",
    "React",
    "Next.js",
    "Frontend",
    "Full Stack",
    "Computer Vision",
    "AI",
    "Portfolio",
    "Software Engineer",
    "Italy",
  ],
  authors: [{ name: "Antonio Rinaldi", url: "https://antoniorinaldidev.com" }],
  creator: "Antonio Rinaldi",
  metadataBase: new URL("https://antoniorinaldidev.com"),
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],

    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  manifest: "/site.webmanifest",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Antonio Rinaldi Portfolio",
    startupImage: [
      {
        url: "/apple-touch-startup-image-768x1004.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    // Meta tags aggiuntivi per iOS 18+
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
  openGraph: {
    title: "Antonio Rinaldi – Portfolio",
    description:
      "Web and mobile development, AI & Robotics. Explore my projects and contact me for collaborations.",
    url: "https://antoniorinaldidev.com",
    siteName: "Antonio Rinaldi",
    type: "website",
    locale: "en_US", // Updated locale
    images: [
      {
        url: "https://antoniorinaldidev.com/og-image-v2.jpg",
        width: 1024,
        height: 1024,
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeScript />
        <ReduxProvider>
          <LenisProvider>
            <GradientBackground />
            <AppWrapper>{children}</AppWrapper>
          </LenisProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
