"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Link from "next/link.js";
import './globals.css'; 


export default function Home() {
  const queryClient = new QueryClient();

  const spotifyAuth = async () => {
    window.location.href = "http://localhost:8080/login"; 
   }

  return (
    <QueryClientProvider client={queryClient}>
    <div className="w-screen h-screen bg-lighter-gray text-center p-40">
      <h1 className="text-center p-7 text-6xl text-white font-spotify" >Album Alchemy</h1>
      <button onClick={spotifyAuth} className="bg-pop-blue text-white p-2 text-center rounded font-extralight">Start Game</button>
    </div>
    </QueryClientProvider>
  );
}
