import useGameStore from "@/store/use-game-store";
import { Star } from "lucide-react";

const PlayerRating = () => {
  const playerRating = useGameStore((state) => state.playerRating);

  return (
    <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-purple-600/50 to-indigo-600/50 backdrop-blur-sm border border-purple-500/40 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg">
      <Star className="size-4 sm:size-5 text-amber-400 fill-amber-400" />
      <div className="flex flex-col items-center">
        <p className="text-xs sm:text-sm font-medium text-purple-200">Rating</p>
        <p className="text-sm sm:text-base md:text-lg font-bold text-white">{playerRating.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default PlayerRating;
