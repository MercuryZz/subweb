import { Toaster } from 'sonner'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className='h-screen antialiased bg-base-200 text-base-content flex flex-col items-center'
        suppressHydrationWarning={true}
      >
        <Toaster richColors position='top-center' />
        {children}
      </body>
    </html>
  )
}
