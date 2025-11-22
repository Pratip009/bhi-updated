// app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "@/components/home/Navbar/ResponsiveNav";
import { ConditionalFooter, ConditionalExtras } from "@/components/ConditionalLayout";
import LoadingScreen from "./Loading";
import { AnimatePresence } from "framer-motion";
import CookieBanner from "@/components/helper/CookieBanner";
import { AuthProvider } from "@/lib/AuthContext";

const font = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bright Horizon Institute",
  description:
    "Bright Horizon Institute offers accredited healthcare, IT, hospitality, business, and technical training with hands-on programs, certifications, and job-focused career preparation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.style.overflow = 'hidden';
              document.body.style.overflow = 'hidden';
            `,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body className={`${font.className}`}>
        <AuthProvider>
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
        </AuthProvider>
      </body>
    </html>
  );
}