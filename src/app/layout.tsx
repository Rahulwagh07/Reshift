 
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import {Providers} from "../redux/Provider"
const inter = Inter({ subsets: ['latin'] })
 

export const metadata: Metadata = {
  title: 'Reshift',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
     <Providers>
        <html lang="en">
        <body className={inter.className}>
            <Toaster/>
            {children}
        </body>
      </html>
     </Providers>
  )
}
