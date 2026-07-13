import type { Metadata } from 'next';
import { Libre_Franklin, PT_Serif, Space_Mono } from 'next/font/google';
import AppLayout from '@/components/layout/layout';
import { Providers } from '@/components/provider';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import './globals.css';

const libreFranklin = Libre_Franklin({ subsets: ['latin'], variable: '--font-sans' });

const ptSerif = PT_Serif({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
});

const spaceMono = Space_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
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
      className={cn(
        'h-full',
        'antialiased',
        libreFranklin.variable,
        ptSerif.variable,
        spaceMono.variable,
        'font-sans',
      )}
      suppressHydrationWarning
    >
      <Providers>
        <body className="flex min-h-full flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <AppLayout>{children}</AppLayout>
            </Providers>
          </ThemeProvider>
        </body>
      </Providers>
    </html>
  );
}
