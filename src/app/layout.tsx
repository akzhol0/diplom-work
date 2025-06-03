import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Rubik } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ContextOverAll } from "@/components/context/context";

export const metadata: Metadata = {
  title: {
    default: "Дипломная работа - Турсынханов Акжол - Brooklyn",
    template: "%s - Brooklyn",
  },
  description:
    "Веб-приложение, созданное для дипломной работы студентом Турсынханов Акжол. Система поддержки принятие решений для помощи пользователю индидуально решит или дать максималально подходящий совет по решению проблемы в области информационной безопасности, по итогам опроса пользователя или по анализу данных",
  openGraph: {
    title: "Дипломная работа - Турсынханов Акжол - Brooklyn",
    description:
      "Веб-приложение, созданное для дипломной работы студентом Турсынханов Акжол. Система поддержки принятие решений для помощи пользователю индидуально решит или дать максималально подходящий совет по решению проблемы в области информационной безопасности, по итогам опроса пользователя или по анализу данных",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    siteName: "Brooklyn",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/open-graph.png`,
        width: 1200,
        height: 630,
        alt: "Дипломная работа - Brooklyn - СППР",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Дипломная работа - Турсынханов Акжол",
    description: "Веб-приложение: Brooklyn Web App.",
    images: `${process.env.NEXT_PUBLIC_BASE_URL}/open-graph.png`,
  },
  appleWebApp: {
    title: "Brooklyn",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
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
