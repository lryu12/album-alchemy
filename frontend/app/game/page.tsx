"use client"
import React, { useState, useEffect } from 'react'
import { Track} from 'models/Album.ts'
import Link from 'next/link'
import { QueryClient, QueryClientProvider ,useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import '../globals.css'

const queryClient = new QueryClient();
const Page = () => {

  const fetchAuth = async () => {
    try {
      const response = await fetch('http://localhost:8080/login'); // Adjust the URL as needed
    } catch (err) {
      console.log("error");
    } 
  };

  // Use useEffect to fetch data on component mount
  useEffect(() => {
    fetchAuth(); // Call the fetch function
  }, []);

  const [inputData, setInputData] = useState<string>('');
  const [responseTrackData, setResponseTrackData] = useState<Track[]>([]);

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/artistname', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputData })
      });
  
      if (response.ok) {
        const responseData = await response.json();
        setResponseTrackData(responseData.tracks);
        console.log("Response from server:", responseData);
        console.log(".tracks?", responseData.tracks);
      } else {
        console.error("Failed to send data:", response.statusText);
      }
    } catch (error) {
      console.error("Error while sending data:", error);
    }
  };

  function DisplayTrackNames( { responseTrackData }: { responseTrackData: Track[] | null } ) {
    return (
      <div className=" px-5 flex flex-wrap">
        {responseTrackData.length > 0 ? (
          responseTrackData.map((track, index) => 
          <div key={index} className="flex flex-col items-center justify-center p-2">
            <p>{track.name}</p>
            <img className="w-3/4 rounded-lg"src={track.album.images[1].url} />
          </div>)
        ) : (
          <p></p>
        )}
      </div>
    );
  }

  function DisplayStartButton() {
    if (responseTrackData && responseTrackData != []) {
      return (
        <button>Play!</button>
        
      )
    } else {
      return <p></p>
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen bg-dark-gray text-white" >
          <form onSubmit={handleSubmit} className="p-10 flex flex-col">
            <h1>Who's Your Favorite Artist?</h1>
              <label className="w-4">
                  <input onChange={handleInputChange} placeholder="Travis Scott" className=" mr-3 rounded bg-lighter-gray hover:bg-lightest-gray text-sm" type="text" value={inputData}name="name" required/>
                  <button type="submit" className="bg-lighter-gray rounded-full py-2 px-2 font-bold mt-5">Submit</button>
              </label>
              {responseTrackData.length > 0 ? (
            <Link href="/gamestart" className="bg-blue-700 hover:bg-blue-950 w-fit rounded-full font-bold px-2 py-2">Click to Begin Quiz!</Link>
          ) : (
            <p></p>
          )}
          </form>
          <DisplayTrackNames responseTrackData = {responseTrackData} />
        
      </div>
    </QueryClientProvider>
  )
}

export default Page