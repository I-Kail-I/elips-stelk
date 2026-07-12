import type { Metadata } from 'next';
import { Libre_Franklin, PT_Serif } from 'next/font/google';
import { Providers } from '@/components/provider';
import { cn } from '@/lib/utils';
import './globals.css';

const libreFranklin = Libre_Franklin({ subsets: ['latin'], variable: '--font-sans' });

const ptSerif = PT_Serif({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'ELIPS',
  description: 'Discover your love and potential with robots',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn('h-full', 'antialiased', libreFranklin.variable, ptSerif.variable, 'font-sans')}
    >
      <Providers>
        <body className="flex min-h-full flex-col py-5">{children}</body>
      </Providers>
    </html>
  );
}
