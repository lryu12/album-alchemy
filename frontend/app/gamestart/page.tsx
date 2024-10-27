'use client';
import { useEffect, useState } from 'react';
import '../globals.css';


const Page = () => {
    const [albumItems, setAlbumItems] = useState([]);
    const [error, setError] = useState(null); // State for error handling
    const [loading, setLoading] = useState(true); // State for loading

    const getAlbum = async () => {
        try {
            const response = await fetch('http://localhost:8080/getalbum');
            if (!response.ok) {
                throw new Error('Failed to fetch album'); 
            }
            const albumObject = await response.json();
            setAlbumItems(albumObject.items);
        } catch (error) {
            console.error('Error fetching album:', error);
            setError(error.message); 
        } finally {
            setLoading(false); // Loading is done
        }
    };

    useEffect(() => {
        getAlbum();
    }, []);

    // Function to generate a random question
    function GenerateRandomQuestion() {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
        if (albumItems && albumItems.length > 0) { // Check if albumItems exists and has items
            const randomIndex = Math.floor(Math.random() * albumItems.length);
            const album = albumItems[randomIndex]; // Get a random album
            const questionAlbumName = album.name;
            const questionAlbumPhoto = album.images[1].url;
            const questionAlbumIncorrectRandomPhoto1 = albumItems[Math.floor(Math.random() * albumItems.length)].images[1].url;
            const questionAlbumIncorrectRandomPhoto2 = albumItems[Math.floor(Math.random() * albumItems.length)].images[1].url;
            return  (<div className="flex">
                        <p>Which album is this song from? {album.name}</p>
                        <div>
                            <img src={questionAlbumIncorrectRandomPhoto1}></img>
                            <img src={questionAlbumPhoto}></img>
                            <img src={questionAlbumIncorrectRandomPhoto2}></img>
                        </div>
                    </div>);
        }
        return <p>No albums available.</p>; // If no albums are available
    }
    return (
        <div className="w-screen h-screen bg-lighter-gray text-white">
            <GenerateRandomQuestion />
        </div>
    );
};

export default Page;
