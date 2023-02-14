import "assets/css/globals.css"
import { Header } from "app/components/header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head />
      <body className="min-h-screen">
        <Header />
        <main className="pb-4 overflow-hidden min-h-[80vh]">{children}</main>
      </body>
    </html>
  )
}
