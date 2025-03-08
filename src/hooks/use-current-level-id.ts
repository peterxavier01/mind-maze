import { useEffect } from "react";

import useGameStore from "@/store/use-game-store";

import { gameLevels } from "@/lib/utils";

export function useCurrentLevelId() {
  const levelStats = useGameStore((state) => state.levelStats);
  const setCurrentLevelId = useGameStore((state) => state.setCurrentLevelId);

  // Use useEffect to update currentLevelId when levelStats changes
  useEffect(() => {
    const currentLevel = gameLevels.find(
      (level) => level.name === levelStats.currentLevel
    )?.id;

    if (currentLevel) {
      setCurrentLevelId(currentLevel);
    } else if (levelStats.currentLevel) {
      console.error(
        `Level "${levelStats.currentLevel}" not found in gameLevels.`
      );
    }
  }, [levelStats, setCurrentLevelId]);

  // Return the current level from the state directly
  return useGameStore((state) => state.currentLevelId);
}
