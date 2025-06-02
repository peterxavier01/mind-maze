import useGameStore from "@/store/use-game-store";

const ScoreBox = ({ title, score }: { title: string; score: number }) => {
  return (
    <div className="flex flex-col items-center">
      <h4 className="font-bold text-xs sm:text-sm bg-slate-200/80 dark:bg-slate-600/60 backdrop-blur-sm text-slate-800 dark:text-slate-200 w-full rounded-md py-1 px-2 sm:px-3 text-center border border-slate-300/60 dark:border-slate-500/40">
        {title}
      </h4>
      <p className="text-sm sm:text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100 mt-1">{score}</p>
    </div>
  );
};

const ScoreBoard = () => {
  const gameScore = useGameStore((state) => state.gameScore);
  const highScore = useGameStore((state) => state.highScore);
  return (
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 bg-white/70 dark:bg-slate-700/50 backdrop-blur-sm border border-slate-300/60 dark:border-slate-600/40 p-2 sm:p-3 rounded-lg shadow-lg">
      <ScoreBox title="Score" score={gameScore} />
      <ScoreBox title="Best" score={highScore} />
    </div>
  );
};

export default ScoreBoard;
