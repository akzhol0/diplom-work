import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Дипломная работа Турсынхан Акжол',
  description: 'Made by NextJS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
