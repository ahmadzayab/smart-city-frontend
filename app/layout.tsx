import type { Metadata } from "next";
import "../styles/globals.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smarto City",
  description: "A smart city dashboard for monitoring and managing urban infrastructure.",
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
