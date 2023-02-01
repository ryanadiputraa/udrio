import "assets/css/globals.css"
import Header from "components/header"

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
        <main className="px-[2%] overflow-hidden">{children}</main>
      </body>
    </html>
  )
}
