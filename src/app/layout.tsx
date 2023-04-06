import "assets/css/globals.css"
import { AppProvider } from "context"
import Header from "app/components/header"
import Toast from "app/components/toast"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head />
      <body id="root" className="min-h-screen">
        <AppProvider>
          <Toast />
          <Header />
          <main className="w-full max-w-7xl pb-4 overflow-hidden min-h-[85vh] mx-auto my-0 px-[2%]">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  )
}
