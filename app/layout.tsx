import './globals.css';
import ClientProvider from './ClientProvider';
import Script from 'next/script';

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