import './globals.css'
import { Jura } from 'next/font/google'

const jura = Jura({ subsets: ['latin'] })

export const metadata = {
  title: 'Puzzle Game Solver',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jura.className}>{children}</body>
    </html>
  )
}
