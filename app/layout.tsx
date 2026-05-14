// app/layout.tsx

import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import type { Metadata, Viewport } from "next";

import ResponsiveNav from "@/components/home/Navbar/ResponsiveNav";
import { ConditionalFooter, ConditionalExtras } from "@/components/ConditionalLayout";
import LoadingScreen from "./Loading";
import { AnimatePresence } from "framer-motion";
import CookieBanner from "@/components/helper/CookieBanner";
import { AuthProvider } from "@/lib/AuthContext";
import AiChat from "@/components/helper/AiChat";
import DisableScroll from "@/components/DisableScroll";

const font = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bright Horizon Institute",
  description:
    "Bright Horizon Institute offers accredited healthcare, IT, hospitality, business, and technical training with hands-on programs, certifications, and job-focused career preparation.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={font.className}>
        <AuthProvider>
          {/* ✅ Safe scroll control */}
          <DisableScroll />

          <CookieBanner />

          <AnimatePresence mode="wait">
            <LoadingScreen />
          </AnimatePresence>

          <div className="relative z-10">
            <ResponsiveNav />
            <main>{children}</main>
            <ConditionalFooter />
            <ConditionalExtras />
          </div>

          <AiChat />
        </AuthProvider>
      </body>
    </html>
  );
}