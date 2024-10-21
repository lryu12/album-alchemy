import type { Metadata } from "next";
import localFont from "next/font/local/index.js";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
        <Header/>
        <main>
        {children}
        </main>
        {/* <Footer/> */}
        </body>
    </html>
  );
}
