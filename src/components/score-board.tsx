import useGameStore from "@/store/use-game-store";

const ScoreBox = ({ title, score }: { title: string; score: number }) => {
  return (
    <div className="flex flex-col items-center">
      <h4 className="font-bold text-sm bg-slate-400 w-full rounded-sm py-1 px-2">
        {title}
      </h4>
      <p className="text-lg">{score}</p>
    </div>
  );
};

const ScoreBoard = () => {
  const gameScore = useGameStore((state) => state.gameScore);
  const highScore = useGameStore((state) => state.highScore);

  return (
    <div className="flex items-center gap-4 bg-slate-600 p-1 rounded-sm">
      <ScoreBox title="Score" score={gameScore} />
      <ScoreBox title="Best" score={highScore} />
    </div>
  );
};

export default ScoreBoard;
