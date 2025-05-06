import type { Metadata } from "next";
import "./globals.css";
import { Rubik } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ContextOverAll } from "@/components/context/context";

export const metadata: Metadata = {
  title: {
    default: "Дипломная работа - Турсынхан Акжол",
    template: "%s - Brooklyn",
  },
  description: "Made by Tursynkhan Akzhol",
};

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={rubik.className}>
        <ContextOverAll>
          <Header />
          {children}
          <Footer />
        </ContextOverAll>
      </body>
    </html>
  );
}
