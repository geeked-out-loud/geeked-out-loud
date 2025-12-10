import type { Metadata } from "next";
import {Noto_Serif, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import { ToastProvider } from "@/components/ToastProvider";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const notoSansMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "~ /shhuuubh",
  description: "geeks attempt at portfolio",
  icons: {
    icon: '/shubh.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSerif.variable} ${notoSansMono.variable} antialiased`}>
        <ToastProvider>
          <Nav />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
