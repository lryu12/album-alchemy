"use client"
import Link from "next/link.js";
import './globals.css'; 

export default function Home() {

  const getRefreshToken = async () => {

    // refresh token that has been previously stored
    const refreshToken = localStorage.getItem('refresh_token');
    const url = "https://accounts.spotify.com/api/token";
 
     const payload = {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: new URLSearchParams({
         grant_type: 'refresh_token',
         refresh_token: refreshToken,
         client_id: clientId
       }),
     }
     const body = await fetch(url, payload);
     const response = await body.json();
 
     localStorage.setItem('access_token', response.accessToken);
     if (response.refreshToken) {
       localStorage.setItem('refresh_token', response.refreshToken);
       console.log(response.refreshToken);
     }
   }

  const spotifyAuth = async () => {
    window.location.href = "http://localhost:8080/login"; 
   }
   

  return (
    <div className="w-screen h-screen bg-lighter-gray text-center p-40">
      <h1 className="text-center p-7 text-6xl text-white font-spotify" >Album Alchemy</h1>
      <button onClick={spotifyAuth} className="bg-pop-blue text-white p-2 text-center rounded font-extralight">Start Game</button>
    </div>
  );
}
