import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { StoreProvider } from '../store/StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Interabank',
  description: 'Interabank',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <StoreProvider>
      <html lang="pt-br">
      <body className={inter.className}>
        {children}
      </body>
    </html>
    </StoreProvider>
  )
}
