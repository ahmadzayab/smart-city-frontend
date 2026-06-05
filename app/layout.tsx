import type { Metadata } from "next";
import "../styles/globals.css";
import "./globals.css";
import { ReduxProvider } from "./store/ReduxProvider";

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
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
