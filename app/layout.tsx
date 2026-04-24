import type {Metadata} from 'next';
import {Schibsted_Grotesk, Martian_Mono, Geist} from 'next/font/google';
import './globals.css';
import {cn} from '@/lib/utils';
import LightRays from '@/components/LightRays';
import Navbar from '@/components/Navbar';

const geist = Geist({subsets: ['latin'], variable: '--font-sans'});

const SchibstedGrotesk = Schibsted_Grotesk({
  variable: '--font-schibsted-grotesk',
  subsets: ['latin'],
});

const geistMono = Martian_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dev Ivent',
  description: "The Hub for Dev Event You Mustn't Miss",
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
        SchibstedGrotesk.variable,
        geistMono.variable,
        'font-sans',
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col">

        <Navbar/>
        <div className='absolute inset-0 top-0 z-[-1] min-h-screen'>
          <LightRays
            raysOrigin="top-center"
            raysColor="#5dfeca"
            raysSpeed={0.5}
            lightSpread={1}
            rayLength={1.4}
            followMouse={true}
            mouseInfluence={0.01}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
