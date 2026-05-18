import { Inter, Geist } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
 });

export const metadata = {
  title: "MoneyFlow",
  description: "Your personalized financial plan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}