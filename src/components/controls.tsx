import { Forward, Pause, Play, RefreshCcw } from "lucide-react";

import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import BgMusicBtn from "@/components/bg-music-btn";
import LevelSelector from "@/components/level-selector";

import useGameStore from "@/store/use-game-store";
import { useGoToNextLevel } from "@/hooks/use-go-to-next-level";

const Controls = ({ resetLevel }: { resetLevel: () => void }) => {
  const toggleGameStatus = useGameStore((state) => state.toggleGameStatus);
  const status = useGameStore((state) => state.status);

  const goToNextLevel = useGoToNextLevel();

  return (
    <div className="flex items-center justify-between mt-4">
      <LevelSelector />

      <ModeToggle />

      <BgMusicBtn />

      {status !== "ended" ? (
        <Button className="cursor-pointer" onClick={toggleGameStatus}>
          {status === "running" ? <Pause /> : <Play />}
          {status === "pending"
            ? "Start"
            : status === "running"
              ? "Pause"
              : "Play"}
        </Button>
      ) : null}

      {status === "ended" ? (
        <Button className="cursor-pointer" onClick={resetLevel}>
          <RefreshCcw />
          Replay
        </Button>
      ) : null}

      {status === "ended" ? (
        <Button className="cursor-pointer" onClick={goToNextLevel}>
          <Forward />
          Next
        </Button>
      ) : null}
    </div>
  );
};

export default Controls;
