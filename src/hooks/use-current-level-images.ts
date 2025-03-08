import { useMemo } from "react";

import useGameStore from "@/store/use-game-store";

import { cardImages, gameLevels, shuffleArray } from "@/lib/utils";

// Fix 2: Create a hook for getting images by current level
export function useCurrentLevelImages() {
  const currentLevelId = useGameStore((state) => state.currentLevelId);

  // This will re-calculate when currentLevelId changes
  const images = useMemo(() => {
    const level = gameLevels.find((level) => level.id === currentLevelId);
    if (!level) return [];

    // Shuffle images and select the required number of card types
    const shuffledImages = shuffleArray(cardImages);
    return shuffledImages.slice(0, level.cardTypes);
  }, [currentLevelId]);

  return images;
}
