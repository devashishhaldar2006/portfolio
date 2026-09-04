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
  title: "Devashish Haldar — Software Engineer · Full Stack Developer · Builder",
  description:
    "Building systems at the intersection of modern full-stack architectures, C++20 systems, and autonomous AI agents. Creator of HackCentral, QuantFlow, and Career Connect.",
  keywords: [
    "Devashish Haldar",
    "Full Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "Node.js",
    "QuantFlow",
    "C++20",
    "AI Agents",
  ],
  authors: [{ name: "Devashish Haldar", url: "https://github.com/devashishhaldar2006" }],
  openGraph: {
    title: "Devashish Haldar — Software Engineer · Full Stack Developer · Builder",
    description:
      "Building systems at the intersection of modern full-stack engineering, C++20 systems, and AI.",
    url: "https://hackcentral.me",
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
