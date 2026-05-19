import type { Metadata } from "next";
import { Intel_One_Mono } from "next/font/google";
import "./globals.css";

const mono = Intel_One_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dhivya Bharathi",
  description: "Student, creative, builder, maker. I love Tinkering.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mono.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
