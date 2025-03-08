import { Pause, Play } from "lucide-react";

import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import BgMusicBtn from "@/components/bg-music-btn";
import LevelSelector from "@/components/level-selector";

import useGameStore from "@/store/use-game-store";

const Controls = () => {
  const toggleGameStatus = useGameStore((state) => state.toggleGameStatus);
  const status = useGameStore((state) => state.status);

  return (
    <div className="flex items-center justify-between mt-4">
      <LevelSelector />

      <ModeToggle />

      <BgMusicBtn />

      <Button
        className="cursor-pointer"
        onClick={toggleGameStatus}
        disabled={status === "ended"}
      >
        {status === "running" ? <Pause /> : <Play />}
        {status === "pending"
          ? "Start"
          : status === "running"
            ? "Pause"
            : "Play"}
      </Button>
    </div>
  );
};

export default Controls;
