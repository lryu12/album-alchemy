import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './globals.css'

const metadata: Metadata = {
  title: 'AlbumAlchemy',
  description: 'How well do you know your favorite artist?'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
        <Header className="bg-dark-gray"/>
        <main className="w-full h-full overflow-scroll bg-lighter-gray">
        {children}
        </main>
        {/* <Footer/> */}
        </body>
    </html>
  );
}
