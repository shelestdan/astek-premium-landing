import type { Metadata } from "next";
import { IBM_Plex_Mono, Schibsted_Grotesk, Syne } from "next/font/google";

import "./globals.css";

const displayFont = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const uiFont = Schibsted_Grotesk({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Astek | Private Construction Atelier",
  description:
    "Astek is a private construction atelier for bespoke residences in Russia, bringing architecture, engineering and execution into one calm line of control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${uiFont.variable} ${monoFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
