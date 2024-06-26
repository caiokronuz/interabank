import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { StoreProvider } from '../store/StoreProvider'
import { Provider } from '../components/Provider'

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
    <Provider>
        <StoreProvider>
        <html lang="pt-br">
        <body className={inter.className}>
          {children}
        </body>
      </html>
      </StoreProvider>
    </Provider>
  )
}
