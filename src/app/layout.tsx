import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MobileShell from "@/components/layout/MobileShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "group11_mvp",
  description: "group11 MVP",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "group11_mvp",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <MobileShell>{children}</MobileShell>
      </body>
    </html>
  );
}
