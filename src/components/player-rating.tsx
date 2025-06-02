import useGameStore from "@/store/use-game-store";
import { Star } from "lucide-react";

const PlayerRating = () => {
  const playerRating = useGameStore((state) => state.playerRating);
  return (
    <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-purple-200/60 to-indigo-200/60 dark:from-purple-600/50 dark:to-indigo-600/50 backdrop-blur-sm border border-purple-400/60 dark:border-purple-500/40 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg">
      <Star className="size-4 sm:size-5 text-amber-600 dark:text-amber-400 fill-amber-600 dark:fill-amber-400" />
      <div className="flex flex-col items-center">
        <p className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-200">Rating</p>
        <p className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white">{playerRating.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default PlayerRating;
