"use client"
import { useState, useEffect } from "react";

const Preference = ({ wantArtist }) => {
  const [artistToAdd, setArtistToAdd] = useState<string>("");
  const [artists, setArtists] = useState([]);

    useEffect(() => {
      console.log("wantArtist value:", wantArtist);
        if (wantArtist) {
            retrieveArtists();
        }
    }, [wantArtist]); 


    const handleAddArtist = async (e: React.FormEvent) => {
      e.preventDefault();
      const success = await addArtists();
      if (success) {
        retrieveArtists(); 
      }
    };


    const handleAddArtistInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setArtistToAdd(e.target.value);
    };

    async function retrieveArtists() {
        try {
            const response : [] = await fetch("http://localhost:8080/preference/get",{
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const allArtistsJson = await response.json();
            setArtists(allArtistsJson);
        } catch (error) {
            console.error("Error fetching artists:", error);
        }
    }

    

    async function addArtists() : boolean {
      try {
          const response = await fetch("http://localhost:8080/preference/add",{
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Include headers
            },
            body: JSON.stringify({ artist_name: artistToAdd }), 
          });

          if (!response.ok) {
            return false;
          } else{
            return true;
          }
      } catch {
        console.error("AddArtists failed to fetch ");
        return false;
      } 
    }
    

    return (
      <div className="flex flex-col justify-center items-center h-fill w-1/3">
        <form onSubmit={handleAddArtist}>
            <input 
              onChange={handleAddArtistInputChange}
              value={artistToAdd}
              placeholder="Travis Scott"
              className=" mr-3 rounded bg-lighter-gray hover:bg-lightest-gray text-sm"
              type="text"
              name="name"
              required />
            <button type="submit" className="bg-green-500 text-black p-2 text-center rounded-lg  font-normal hover:bg-green-700">
              Add Artist To Collection
            </button>
        </form>
            <div className="w-fill flex flex-col justify-center">
              <h2 className="text-center p-5 text-2xl"> My Artist Collections</h2>
              <div className="border-b-2">
                  {artists.map((artist, index) => (
                      <div className="bg-lightest-gray text-center border-x-2 border-t-2" key={index}>{artist}</div>
                  ))}
              </div>
            </div>
      </div>
    );
};

export default Preference;
