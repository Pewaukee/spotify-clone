import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search - Spofity Clone',
  description: 'Searching for music and other content.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
