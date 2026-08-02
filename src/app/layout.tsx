import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'M39 Yo\'l Yordam - Tezkor Yordam Xizmati',
  description: 'M39 magistral yo\'lida radar, ustaxona va tezkor yordam xizmati',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz">
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
