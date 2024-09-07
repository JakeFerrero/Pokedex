import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import type { Metadata } from 'next';
import WebsiteHeader from './components/utils/WebsiteHeader';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'Pokedex'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WebsiteHeader />
        {children}
      </body>
    </html>
  );
}
