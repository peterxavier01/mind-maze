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

  useEffect(() => {
    if (!isGameRunning || gameStatus === "ended" || gameStatus === "pending")
      return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0)); // Prevent negative values
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameRunning, gameStatus]);

  // Call onComplete when timer reaches 0
  useEffect(() => {
    if (secondsLeft === 0 && onComplete) {
      onComplete();
    }
  }, [secondsLeft, onComplete]);

  useEffect(() => {
    // Calculate time taken for game to end when status = 'ended'
    if (gameStatus === "ended") {
      const timeTaken = totalGameTimeInSeconds - secondsLeft;

      setTimeTaken(timeTaken);
    }
  }, [gameStatus, secondsLeft, setTimeTaken]);

  return (
    <div>
      <div className="flex items-center gap-1">
        <TimerIcon className="size-5" />
        <p className="font-medium text-lg">{formatTime(secondsLeft)}</p>
      </div>
    </div>
  );
};

export default Timer;
