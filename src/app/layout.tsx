import "assets/css/globals.css"
import { Header } from "components/header"

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
        <main className="pb-4 overflow-hidden min-h-[88vh]">{children}</main>
      </body>
    </html>
  )
}
