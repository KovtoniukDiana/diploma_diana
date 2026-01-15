import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/src/providers/provider";
import Header from "@/src/components/header";
import Background from "@/src/components/backgr";
import Footer from "@/src/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dianema",
  description: "Diana's cinema",
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

          <div className="min-h-screen flex flex-col">
            <main className="relative grow">
              <div className="absolute inset-0">
                <Background />
              </div>
              
              {children}
            </main>

          <Footer />
          </div>

        </Providers>
      </body>
    </html>
  );
}
