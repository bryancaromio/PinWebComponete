import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Image Slideshow",
  description: "Interactive image slideshow with location pins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
