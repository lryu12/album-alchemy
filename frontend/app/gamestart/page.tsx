'use client'
import { useEffect, useState } from 'react';
import { useAlbums } from '../hooks/useAlbums';
import Link from 'next/link';
import ScoreDisplay from '../components/ScoreDisplay';
import '../globals.css';

const Page = () => {
    const [score, setScore] = useState(0);
    const [gameStatus, setGameStatus] = useState(true);


    function shuffleArray(a : Array) : Array {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function IncorrectScreen() {
        return (
            <div>
                <h2>YOU FAILED</h2>
                <button> Start Over </button>
                <Link href='../game'> Try New Artist</Link>
            </div>
        );
    }

    function resetScore() {
        setScore(0);
        setGameStatus(false);
    }

    function checkCorrect(isCorrect : boolean) {
        if (isCorrect === true) {
            setScore(score + 1);
        } else {
            resetScore();
        }

    }

    function GenerateRandomQuestion() {
        const { isLoading, error, data: albums } = useAlbums();

        if (isLoading) return <p>Loading...</p>;
        if (error) return <p>An error has occurred: {error.message}</p>;

        if (!albums || albums.length < 5) {
            return <p>No albums available.</p>; 
        }
    
        let count = 0;
        const randomNums = [];
        while (count < 5) {
            const ranNum = Math.floor(Math.random() * albums.length);
            if (!randomNums.includes(ranNum)){
                randomNums.push(ranNum);
                count++;
            }
        }
        const album = albums[randomNums[0]];
        const questionAlbumName = album.name;
        const questionAlbumPhoto = album.images[1].url;
        const questionAlbumIncorrectRandomPhoto1 = albums[randomNums[1]].images[1].url;
        const questionAlbumIncorrectRandomPhoto2 = albums[randomNums[2]].images[1].url;
        const questionAlbumIncorrectRandomPhoto3 = albums[randomNums[3]].images[1].url;
        const questionAlbumIncorrectRandomPhoto4 = albums[randomNums[4]].images[1].url;
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
                    <h2 className="text-center font-bold text-3xl pb-10">{questionAlbumName}</h2>
                    <div className="flex flex-row">
                        {shuffledImages.map((image, index: number) => (
                            <img key={index} src={image.src} onClick={() => checkCorrect(image.isCorrect)}/>
                        ))}
                    </div>
                </div>);
    
        return <p>No albums available.</p>; // If no albums are available
    }
    
    return (
        <div className="w-screen h-screen bg-lighter-gray text-white flex flex-col justify-items-center">
            { gameStatus ? (
                <>
                    <GenerateRandomQuestion />
                    <ScoreDisplay scoreValue={score} className=""/>
                </>
            ) :
            (
            <div>
                <IncorrectScreen />
            </div>
            )
            }
        </div>
    );
};

export default Page;
