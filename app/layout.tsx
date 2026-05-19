// app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Playfair_Display, Cormorant_Garamond } from "next/font/google";

// Suppress TS error for side-effect CSS import when no type declarations exist
// @ts-ignore
import "./globals.css";

import ResponsiveNav from "@/components/home/Navbar/ResponsiveNav";
import {
  ConditionalFooter,
  ConditionalExtras,
} from "@/components/ConditionalLayout";

import LoadingScreen from "./Loading";

import { AnimatePresence } from "framer-motion";

import CookieBanner from "@/components/helper/CookieBanner";
import { AuthProvider } from "@/lib/AuthContext";
import AiChat from "@/components/helper/AiChat";
import DisableScroll from "@/components/DisableScroll";

// Main font
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Premium heading font
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

// Secondary premium font
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.brighthorizoninstitute.com"),

  title: {
    default: "Bright Horizon Institute",
    template: "%s | Bright Horizon Institute",
  },

  description:
    "Bright Horizon Institute offers accredited healthcare, IT, hospitality, business, and technical training with hands-on programs, certifications, and job-focused career preparation.",

  keywords: [
    "Bright Horizon Institute",
    "Healthcare courses",
    "IT training institute",
    "Hospitality training",
    "Business courses",
    "Technical training",
    "Career institute",
    "Skill development",
  ],

  authors: [
    {
      name: "Bright Horizon Institute",
    },
  ],

  creator: "Bright Horizon Institute",

  openGraph: {
    title: "Bright Horizon Institute",
    description:
      "Accredited healthcare, IT, hospitality, business, and technical training institute.",

    url: "https://www.brighthorizoninstitute.com",

    siteName: "Bright Horizon Institute",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bright Horizon Institute",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Bright Horizon Institute",
    description:
      "Healthcare, IT, hospitality, business, and technical training institute.",
    images: ["/og-image.jpg"],
  },

icons: {
  icon: "/favicon-v2.ico",
  shortcut: "/favicon-v2.ico",
},

manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#303079",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <body
        className={`
          ${spaceGrotesk.variable}
          ${playfair.variable}
          ${cormorant.variable}
          font-sans
          antialiased
        `}
        suppressHydrationWarning
      >
        <AuthProvider>
          {/* Disable scroll during loading */}
          <DisableScroll />

          {/* Cookie Banner */}
          <CookieBanner />

          {/* Premium Loading Screen */}
          <AnimatePresence mode="wait">
            <LoadingScreen />
          </AnimatePresence>

          {/* Main Website */}
          <div className="relative z-10">
            <ResponsiveNav />

            <main>{children}</main>

            <ConditionalFooter />

            <ConditionalExtras />
          </div>

          {/* AI Assistant */}
          <AiChat />
        </AuthProvider>
      </body>
    </html>
  );
}