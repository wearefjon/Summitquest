import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "SummitQuest — Maharashtra Adventure Marketplace",
    template: "%s | SummitQuest",
  },
  description:
    "Discover and book verified trekking, rafting, camping, and outdoor adventures across Maharashtra.",
  keywords: ["adventure", "Maharashtra", "trekking", "rafting", "booking", "Lonavala", "Kolad"],
  authors: [{ name: "SummitQuest Team" }],
  openGraph: {
    title: "SummitQuest — Maharashtra Adventure Marketplace",
    description: "Discover and book verified trekking, rafting, camping, and outdoor adventures across Maharashtra.",
    url: "https://summitquest.in",
    siteName: "SummitQuest",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SummitQuest — Maharashtra Adventure Marketplace",
    description: "Discover and book verified trekking, rafting, camping, and outdoor adventures across Maharashtra.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  }
};

import { Navbar } from "@/components/layout/Navbar";

import { AuthProvider } from "@/components/providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <QueryProvider>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
