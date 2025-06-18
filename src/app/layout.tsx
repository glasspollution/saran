import type { Metadata } from "next";
import { Inter, Caudex } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const caudex = Caudex({
  variable: "--font-caudex",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "AI Academic Platform - Transform Teaching with AI",
  description: "AI-powered academic platform for K-12 schools. Transform curriculum input into comprehensive lesson plans, revision materials, and assessments through our chat-based interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${caudex.variable} antialiased font-inter`}
      >
        {children}
      </body>
    </html>
  );
}
