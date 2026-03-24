import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DartAway — Throw a Dart, Find Your Trip",
  description: "An interactive 3D globe where you throw darts to discover your next travel destination.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} dark`}>
      <body className="h-screen w-screen overflow-hidden bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
