'use client';
import { useEffect, useState } from 'react';
import '../globals.css';


const Page = () => {
    const [albumItems, setAlbumItems] = useState([]);
    const [error, setError] = useState(null); // State for error handling
    const [loading, setLoading] = useState(true); // State for loading
    const [score, setScore] = useState(0);

    // useEffect(() => {

    // }, [score]);

    const getAlbum = async () => {
        try {
            const response = await fetch('http://localhost:8080/getalbum');
            if (!response.ok) {
                throw new Error('Failed to fetch album'); 
            }
            const albumObject = await response.json();
            const filteredAlbum = [];
            albumObject.items.forEach(album => {
                if (album.album_type === 'album'){
                    filteredAlbum.push(album);
                }
            });
            setAlbumItems(filteredAlbum);
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

    function shuffleArray(a : Array) : Array {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function checkCorrect(isCorrect : boolean) {
        if (isCorrect === true) {
            setScore(score + 1);
        }
    }

    // Function to generate a random question
    function GenerateRandomQuestion() {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
        if (albumItems && albumItems.length > 0) { 
            
            let count = 0;
            const randomNums = [];
            while (count < 5) {
                const ranNum = Math.floor(Math.random() * albumItems.length);
                if (!randomNums.includes(ranNum)){
                    randomNums.push(ranNum);
                    count++;
                }
            }

            const album = albumItems[randomNums[0]];
            const questionAlbumName = album.name;
            const questionAlbumPhoto = album.images[1].url;
            const questionAlbumIncorrectRandomPhoto1 = albumItems[randomNums[1]].images[1].url;
            const questionAlbumIncorrectRandomPhoto2 = albumItems[randomNums[2]].images[1].url;
            const questionAlbumIncorrectRandomPhoto3 = albumItems[randomNums[3]].images[1].url;
            const questionAlbumIncorrectRandomPhoto4 = albumItems[randomNums[4]].images[1].url;
            const images = [
                { src: questionAlbumPhoto, isCorrect: true },
                { src: questionAlbumIncorrectRandomPhoto1, isCorrect: false },
                { src: questionAlbumIncorrectRandomPhoto2, isCorrect: false },
                { src: questionAlbumIncorrectRandomPhoto3, isCorrect: false },
                { src: questionAlbumIncorrectRandomPhoto4, isCorrect: false },
            ];

            const shuffledImages = shuffleArray(images);
            
            return  (<div className="flex flex-col">
                        <p className="text-center p-4">Which is the Correct Album Cover?</p>
                        <p>{questionAlbumName}</p>
                        <div className="flex flex-row">
                            {shuffledImages.map((image, index: number) => (
                                <img key={index} src={image.src}/>
                            ))}
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
