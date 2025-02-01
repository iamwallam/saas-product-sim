import type { Metadata } from 'next'
import './globals.css'
import { Crimson_Pro } from 'next/font/google'

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],  // You can adjust these weights based on your needs
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'INCITE',
  description: 'Created with v0 (example)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={crimsonPro.className}>
      <body>{children}</body>
    </html>
  )
}
