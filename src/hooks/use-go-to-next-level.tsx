import { useCallback } from "react";

import useCompletionModal from "@/store/use-completion-modal";
import useGameStore from "@/store/use-game-store";

import { gameLevels } from "@/lib/utils";

export function useGoToNextLevel() {
  const currentLevelId = useGameStore((state) => state.currentLevelId);
  const setLevel = useGameStore((state) => state.setLevel);
  const setGameStatus = useGameStore((state) => state.setGameStatus);
  const setGameScore = useGameStore((state) => state.setGameScore);
  const onClose = useCompletionModal((state) => state.onClose);

  // Return a function that can be called by components
  return useCallback(() => {
    const lastLevelId = gameLevels.length;

    // Check if already at the last level
    if (currentLevelId >= lastLevelId) {
      return;
    }

    const nextLevelId = currentLevelId + 1;
    const nextLevel = gameLevels.find((level) => level.id === nextLevelId);

    if (!nextLevel) {
      return;
    }

    setLevel(nextLevelId); // Update both currentLevelId and levelStats state
    setGameStatus("pending"); // Reset game status, which prevents modal pop-up
    setGameScore(0); // Reset game score

    onClose(); // close modal
  }, [currentLevelId, setLevel, onClose, setGameStatus, setGameScore]);
}
