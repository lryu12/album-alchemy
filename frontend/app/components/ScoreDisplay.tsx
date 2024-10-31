interface ScoreProps {
    scoreValue: number; 
}

const Score: React.FC<ScoreProps> = ({ scoreValue }) => {
    return <div className="text-center font-spotify text-6xl">Score: {scoreValue}</div>;
};

const ScoreDisplay: React.FC = ({scoreValue}) => {
    return (
        <div className="flex flex-col justify-center w-fill pt-10">
            <h1 className="text-center">Game Score</h1>
            <Score scoreValue={scoreValue} className="px-2 py-2"/>
        </div>
    );
};

export default ScoreDisplay;
