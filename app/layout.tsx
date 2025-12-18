import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/src/providers/provider";
import Header from "@/src/components/header";
import Stars from "@/src/components/bg_stars";
import Hearts from "@/src/components/bg_hearts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Films with Diana",
  description: "Diana's favorite films collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Header />

          <main id="animated-bg" >
            <Hearts />
            <Stars />

            {children}
          </main>

        </Providers>
      </body>
    </html>
  );
}
