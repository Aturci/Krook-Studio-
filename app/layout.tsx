import type { Metadata } from "next";
import { Barrio, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

const barrio = Barrio({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-barrio",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krook Studio — Bold Handcrafted Treasures",
  description:
    "Bold handcrafted treasures with that raw organic beauty present in nature. Handmade jewelry from Berlin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barrio.variable} ${playfair.variable} ${inter.variable} bg-void text-bone antialiased`}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
