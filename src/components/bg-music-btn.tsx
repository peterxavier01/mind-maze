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
    >
      {!playing ? <VolumeOff /> : <Volume2 />}
    </button>
  );
};

export default BgMusicBtn;
