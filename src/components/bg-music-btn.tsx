import { useEffect, useState } from "react";
import { Volume2, VolumeOff } from "lucide-react";

import { bgMusic } from "@/lib/sounds";
import useGameStore from "@/store/use-game-store";

const BgMusicBtn = () => {
  const [playing, setPlaying] = useState(false);
  const status = useGameStore((state) => state.status);

  useEffect(() => {
    if (status !== "pending") {
      bgMusic.pause();
      setPlaying(false);
    }
  }, [status]);

  const toggleMusic = () => {
    if (playing) {
      bgMusic.pause();
    } else {
      bgMusic.play();
    }
    setPlaying(!playing);
  };
  return (
    <button
      onClick={toggleMusic}
      disabled={status === "running" || status === "paused"}
      className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300/30 dark:border-slate-600/30 text-slate-700 dark:text-slate-300 hover:bg-white/90 dark:hover:bg-slate-700/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
    >
      {!playing ? <VolumeOff className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );
};

export default BgMusicBtn;
