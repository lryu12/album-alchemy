"use client"
import React, { useState } from 'react'

const page = () => {

  const [inputData, setInputData] = useState<string>('');

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
        console.log("Response from server:", responseData);
      } else {
        console.error("Failed to send data:", response.statusText);
      }
    } catch (error) {
      console.error("Error while sending data:", error);
    }
  };
  

  


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>
                Who's Your Favorite Artist?
                <input onChange={handleInputChange}className="border-amber-500 border"type="text" value={inputData}name="name" required/>
            </label>

        </form>
    </div>
  )
}

export default page

