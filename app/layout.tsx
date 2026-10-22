import './globals.css';
import ClientProvider from './ClientProvider';
import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ciboe Edu - Bimbel & Simulasi CBT TKA',
  description: 'Platform bimbingan belajar dan simulasi CBT online terstandar nasional untuk persiapan ujian TKA.',
  icons: {
    icon: [
      { url: '/logo.png', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Ciboe Edu - Bimbel & Simulasi CBT TKA',
    description: 'Platform bimbingan belajar dan simulasi CBT online terstandar nasional untuk persiapan ujian TKA.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="id">
      <body>
        <ClientProvider>
          {children}
        </ClientProvider>

    <Script 
      src="https://app.sandbox.midtrans.com/snap/snap.js" 
      data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
      strategy="afterInteractive"
    />
        
      </body>
    </html>
  );
}