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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
