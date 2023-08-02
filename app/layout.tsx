import Player from './components/Player';
import PlayerProvider from './context/PlayerContext';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spofity Clone',
  description: 'A clone of the popluar music streaming service.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <main className='bg-neutral-700 w-full min-h-screen'>
          <PlayerProvider>
            {children}

            <Player />
          </PlayerProvider>
        </main>
      </body>
    </html>
  );
}
