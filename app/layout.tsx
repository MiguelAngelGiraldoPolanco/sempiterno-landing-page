import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
})

const lato = Lato({ 
  subsets: ["latin"],
  weight: ['300', '400', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sempiterno: Aromas & Momentos | Velas Artesanales en Cali',
  description: 'Velas artesanales personalizadas para honrar memorias eternas. Especialistas en velas de mascotas y figuras religiosas. Hechas a mano en Cali, Colombia.',
  keywords: ['velas artesanales', 'velas personalizadas', 'velas de mascotas', 'Cali', 'Colombia', 'memorial mascotas'],
  generator: 'v0.app',
  icons: {
    icon: [
    { url: '/favicon_io/favicon-16x16.png'},
    { url: '/favicon_io/favicon-32x32.png'}, 
  ],
    apple: '/favicon_io/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#8a2b8b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${lato.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
