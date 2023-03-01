import "assets/css/globals.css"
import Header from "app/components/header"
import { AppProvider } from "context"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head />
      <body className="min-h-screen">
        <AppProvider>
          <Header />
          <main className="w-full max-w-7xl pb-4 overflow-hidden min-h-[85vh] mx-auto my-0 px-[2%]">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  )
}
