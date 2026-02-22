import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import ScrollToTop from '@/components/ScrollToTop'
import ChatAssistant from '@/components/ChatAssistant'
import { Providers } from '@/components/Providers'
import './globals.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Stratosphere | Geopolitics Intelligence Platform',
  description: 'Cutting-edge geopolitics intelligence and analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={sourceSans.variable}>
      <body className="font-body min-h-screen">
        <Providers>
          <ScrollToTop />
          {children}
          <ChatAssistant />
        </Providers>
      </body>
    </html>
  )
}
