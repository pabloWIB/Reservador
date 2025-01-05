import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sistema de Reservas - Glamping',
  description: 'Reserva del Ruiz - El Glamping de un millón de estrellas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex items-center justify-center min-h-screen`}>
        <main className="w-full max-w-4xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  )
}

