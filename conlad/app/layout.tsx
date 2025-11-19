import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Conrad Bradford",
  description: "Personal website of Conrad Bradford",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${garamond.variable} antialiased`}
        style={{ fontFamily: 'var(--font-garamond), "Apple Garamond", Garamond, serif' }}
      >
        {children}
      </body>
    </html>
  );
}
