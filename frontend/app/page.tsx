import Link from "next/link.js";




export default function Home() {

  return (
    <div>
      <h1 className="text-center text-5xl p-4 text-teal-500">Album Alchemy</h1>
      <Link href="/game">Start Game</Link>
    </div>
  );
}
