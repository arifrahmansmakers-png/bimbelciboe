import './globals.css';
import ClientProvider from './ClientProvider';
import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bimbel CBT',
  description: 'Platform bimbingan belajar dan simulasi CBT online untuk persiapan ujian TKA.',
  openGraph: {
    title: 'Bimbel CBT',
    description: 'Platform bimbingan belajar dan simulasi CBT online untuk persiapan ujian TKA.',
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