import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MobileShell from "@/components/layout/MobileShell";
import PostHogProvider from "@/components/providers/PostHogProvider";
import { CartProvider } from "@/context/cart-context";
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
  title: "우리동네 농부 | group11 MVP",
  description: "내 주변 농부와 직거래하는 로컬 푸드 MVP",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "우리동네 농부",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
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
        <PostHogProvider>
          <MobileShell>
            <CartProvider>{children}</CartProvider>
          </MobileShell>
        </PostHogProvider>
      </body>
    </html>
  );
}
