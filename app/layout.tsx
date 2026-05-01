import type { Metadata } from "next";
import { Barrio, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
