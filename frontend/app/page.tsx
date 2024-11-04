"use client";
import Link from "next/link.js";
import "./globals.css";

export default function Home() {
  const spotifyAuth = async () => {
    window.location.href = "http://localhost:8080/login";
  };

  return (
    <div className="w-screen h-screen bg-dark-gray text-center p-40">
      <h1 className="text-center p-7 text-6xl text-white font-spotify">
        Album Alchemy
      </h1>
      <button
        onClick={spotifyAuth}
        className="bg-green-500 text-black p-2 text-center rounded-lg  font-normal hover:bg-green-700"
      >
        Start Game
      </button>
    </div>
  );
}
