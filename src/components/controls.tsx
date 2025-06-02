import { Forward, Pause, Play, RefreshCcw, Home } from "lucide-react";

import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import BgMusicBtn from "@/components/bg-music-btn";
import LevelSelector from "@/components/level-selector";

import useGameStore from "@/store/use-game-store";
import { useGoToNextLevel } from "@/hooks/use-go-to-next-level";

const Controls = ({ resetLevel }: { resetLevel: () => void }) => {
  const toggleGameStatus = useGameStore((state) => state.toggleGameStatus);
  const status = useGameStore((state) => state.status);
  const setCurrentPage = useGameStore((state) => state.setCurrentPage);

  const goToNextLevel = useGoToNextLevel();

  const handleGoHome = () => {
    setCurrentPage("home");
  };
  
  return (    <div className="flex items-center justify-between mt-4 sm:mt-6 flex-wrap gap-2 sm:gap-3 p-3 sm:p-4 bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm border border-slate-300/40 dark:border-slate-600/20 rounded-xl">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer bg-slate-200/70 dark:bg-slate-700/50 border-slate-300/60 dark:border-slate-600/40 text-slate-800 dark:text-slate-200 hover:bg-slate-300/70 dark:hover:bg-slate-600/60 hover:text-slate-900 dark:hover:text-white text-xs sm:text-sm px-2 sm:px-3"
          onClick={handleGoHome}
        >
          <Home className="size-3 sm:size-4" />
          <span className="hidden sm:inline">Home</span>
        </Button>
        <LevelSelector />
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <ModeToggle />
        <BgMusicBtn />
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {status !== "ended" ? (
          <Button
            className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-lg hover:shadow-teal-500/25 text-xs sm:text-sm px-2 sm:px-3"
            onClick={toggleGameStatus}
          >
            {status === "running" ? (
              <Pause className="size-3 sm:size-4" />
            ) : (
              <Play className="size-3 sm:size-4" />
            )}
            <span className="hidden sm:inline ml-1">
              {status === "pending"
                ? "Start"
                : status === "running"
                ? "Pause"
                : "Play"}
            </span>
          </Button>
        ) : null}

        {status === "ended" ? (
          <Button
            className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-lg hover:shadow-purple-500/25 text-xs sm:text-sm px-2 sm:px-3"
            onClick={resetLevel}
          >
            <RefreshCcw className="size-3 sm:size-4" />
            <span className="hidden sm:inline ml-1">Replay</span>
          </Button>
        ) : null}

        {status === "ended" ? (
          <Button
            className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-white border-0 shadow-lg hover:shadow-amber-500/25 text-xs sm:text-sm px-2 sm:px-3"
            onClick={goToNextLevel}
          >
            <Forward className="size-3 sm:size-4" />
            <span className="hidden sm:inline ml-1">Next</span>
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Controls;
