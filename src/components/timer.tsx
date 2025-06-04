import { useEffect, useState } from "react";
import { formatTime } from "../lib/utils";
import useGameStore from "@/store/use-game-store";
import { TimerIcon } from "lucide-react";
import { totalGameTimeInSeconds } from "@/lib/constants";

interface TimerProps {
  timeInSeconds: number;
  onComplete?: () => void;
}

const Timer = ({ timeInSeconds, onComplete }: TimerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(timeInSeconds);
  const isGameRunning = useGameStore((state) => state.isGameRunning);
  const gameStatus = useGameStore((state) => state.status);
  const setTimeTaken = useGameStore((state) => state.setTimeTaken);

  // Reset timer when timeInSeconds prop changes OR when game status changes to pending (for Try Again)
  useEffect(() => {
    setSecondsLeft(timeInSeconds);
  }, [timeInSeconds]);

  // Reset timer when game status changes to pending (Try Again clicked)
  useEffect(() => {
    if (gameStatus === "pending") {
      setSecondsLeft(timeInSeconds);
    }
  }, [gameStatus, timeInSeconds]);

  useEffect(() => {
    if (!isGameRunning || gameStatus === "ended" || gameStatus === "pending")
      return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0)); // Prevent negative values
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameRunning, gameStatus]);

  // Call onComplete when timer reaches 0 and game is running
  useEffect(() => {
    if (secondsLeft === 0 && onComplete && gameStatus === "running") {
      onComplete();
    }
  }, [secondsLeft, onComplete, gameStatus]);

  useEffect(() => {
    // Calculate time taken for game to end when status = 'ended'
    if (gameStatus === "ended") {
      const timeTaken = totalGameTimeInSeconds - secondsLeft;
      setTimeTaken(timeTaken);
    }
  }, [gameStatus, secondsLeft, setTimeTaken]);

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 bg-white/70 dark:bg-slate-700/50 backdrop-blur-sm border border-slate-300/60 dark:border-slate-600/40 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg">
      <TimerIcon className="size-4 sm:size-5 text-teal-600 dark:text-teal-400" />
      <p className="font-medium text-sm sm:text-base md:text-lg text-slate-800 dark:text-slate-200">
        {formatTime(secondsLeft)}
      </p>
    </div>
  );
};

export default Timer;
