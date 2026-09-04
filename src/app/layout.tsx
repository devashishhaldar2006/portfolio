import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollToTopOnRefresh } from "@/components/ScrollToTopOnRefresh";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devashish Haldar — Software Engineer · Quant Developer · Builder",
  description:
    "Building systems at the intersection of high-performance software, quantitative finance, and autonomous AI agents. Creator of QuantFlow (1.48M+ ticks/sec backtesting engine).",
  keywords: [
    "Devashish Haldar",
    "Quant Developer",
    "Software Engineer",
    "Quantitative Finance",
    "QuantFlow",
    "C++20",
    "LangGraph",
    "High Performance Systems",
  ],
  authors: [{ name: "Devashish Haldar", url: "https://github.com/devashishhaldar2006" }],
  openGraph: {
    title: "Devashish Haldar — Software Engineer · Quant Developer · Builder",
    description:
      "Building systems at the intersection of software, quantitative finance, and AI.",
    url: "https://quantflow.hackcentral.me",
    siteName: "Devashish Haldar Portfolio",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#F7F7F4] text-[#111111] selection:bg-emerald-100 selection:text-emerald-900">
        <ScrollToTopOnRefresh />
        {children}
      </body>
    </html>
  );
}
