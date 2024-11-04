"use client";
import Preference from '../components/preference';
import React, { useEffect, useState } from "react";
import { Track } from "models/Album.ts";
import Link from "next/link";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import "../globals.css";

const queryClient = new QueryClient();
const Page = () => {
  const [inputData, setInputData] = useState<string>("");
  const [apiState, setApiState] = useState<boolean>(false);
  const [dbArtist, setDbArtist] = useState<boolean>(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  useEffect(()=> {
    setDbArtist(true);
  },[]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/artistname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: inputData }),
      });

      const resBody = await response.json();
      if (resBody.message === "POST request successful") {
        setApiState(true);
      }
    } catch (error) {
      console.error("Error while sending data:", error);
    }
  };

  const handleAddArtist = async (e: React.FormEvent) => {
    e.preventDefault();
    
  };


  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen bg-dark-gray text-white">
        <form onSubmit={handleSubmit} className="p-10 flex flex-col">
          <h1>Who's Your Favorite Artist?</h1>
          <label className="w-4">
            <input
              onChange={handleInputChange}
              placeholder="Travis Scott"
              className=" mr-3 rounded bg-lighter-gray hover:bg-lightest-gray text-sm"
              type="text"
              value={inputData}
              name="name"
              required
            />
            <button
              type="submit"
              className="bg-lighter-gray rounded-full py-2 px-2 font-bold mt-5"
            >
              Submit
            </button>
          </label>
          <>
            {apiState
              ? <Link href="/gamestart" className="bg-blue-300 py-2 px-2 w-20">Click to Start Game</Link>
              : <p>Enter Artist To Start Game</p>}
          </>
        </form>
        <Preference wantArtist = {dbArtist}/>
      </div>
    </QueryClientProvider>
  );
};

export default Page;
