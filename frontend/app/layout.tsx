'use client'
import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css'

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <html lang="en">
          <body>
          <Header className="bg-dark-gray"/>
          <main className="w-full h-full overflow-scroll bg-lighter-gray">
          {children}
          </main>
          </body>
      </html>
    </QueryClientProvider>
  );
}
