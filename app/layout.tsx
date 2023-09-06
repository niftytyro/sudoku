import "./globals.css";
import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Sudoku | Mobbin",
  description: "A fun Sudoku game made for Mobbin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${caveat.variable} bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}
