import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/providers/QueryProvider";
import Navbar from "@/components/Navbar/Navbar";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Price Alert | Real-Time Price Monitoring",
  description: "Monitor product prices in real-time and get instant alerts when prices drop below your target.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en" data-theme="dark" className="scroll-smooth">
        <body
          className={`${dmSerif.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} antialiased font-sans bg-base-200 text-base-content min-h-screen`}
        >
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </QueryProvider>
  );
}
