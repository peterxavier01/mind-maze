import { gameLevels } from "@/lib/utils";
import useGameStore from "@/store/use-game-store";

export function useLevelTimer() {
  const currentLevelId = useGameStore((state) => state.currentLevelId);

  // This will re-calculate when currentLevelId changes
  const timeLimit =
    gameLevels.find((level) => level.id === currentLevelId)?.timeLimit || 0;

  return timeLimit;
}
