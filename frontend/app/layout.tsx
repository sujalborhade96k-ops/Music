import type { Metadata } from 'next';
import './globals.css';
import { QueueProvider } from '@/context/QueueContext';
import { DarkModeProvider } from '@/context/DarkModeContext';

export const metadata: Metadata = {
  title: 'TuneStream',
  description: 'A minimal YouTube Music-style player',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DarkModeProvider>
          <QueueProvider>{children}</QueueProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
