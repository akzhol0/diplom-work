import type { Metadata } from 'next';
import './globals.css';
import { Rubik } from 'next/font/google';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { ContextOverAll } from '@/components/context/context';

export const metadata: Metadata = {
  title: 'Дипломная работа - Турсынхан Акжол',
  description: 'Made by NextJS',
};

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
