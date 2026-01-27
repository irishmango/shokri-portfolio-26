import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MainLayout from "@/components/layout/MainLayout";
import { LanguageProvider } from "@/context/LanguageContext";
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
  title: "Shokri Francis Raoof - Technical Product Owner",
  description: "Portfolio of Shokri Francis Raoof, Technical Product Owner based in Berlin",
  icons: {
    icon: "/preview_icon.png",
    apple: "/preview_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LanguageProvider>
          <MainLayout>{children}</MainLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
