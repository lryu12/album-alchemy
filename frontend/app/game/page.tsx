"use client"
import React, { useState, useEffect } from 'react'
import { Track} from 'models/Album.ts'
const page = () => {

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
      <div>
        {responseTrackData.length > 0 ? (
          responseTrackData.map((track, index) => 
          <div>
            <p key={index}>{track.name}</p>
            <p key={index}>{track.total_tracks}</p>
          </div>)
        ) : (
          <p>Loading tracks...</p>
        )}
      </div>
    );
  }
    
  



  


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                Who's Your Favorite Artist?
                <input onChange={handleInputChange}className="border-amber-500 border"type="text" value={inputData}name="name" required/>
            </label>

        </form>
        <DisplayTrackNames responseTrackData = {responseTrackData} />
        
    </div>
  )
}

export default page

