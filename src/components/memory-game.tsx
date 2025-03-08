import { useEffect, useState } from "react";

import Timer from "./timer";
import ScoreBoard from "./score-board";
import Card from "./card";
import Controls from "./controls";

import useGameStore from "@/store/use-game-store";
import useCompletionModal from "@/store/use-completion-modal";

import { shuffleArray } from "../lib/utils";

import { Card as CardType } from "../types";

import { gameWon } from "@/lib/sounds";
import { useLevelTimer } from "@/hooks/use-level-timer";

interface MemoryGameProps {
  images: string[];
}

const MemoryGame = ({ images }: MemoryGameProps) => {
  const status = useGameStore((state) => state.status);
  const setGameStatus = useGameStore((state) => state.setGameStatus);
  const setNumberOfMatches = useGameStore((state) => state.setNumberOfMatches);
  const numberOfGamesPlayed = useGameStore(
    (state) => state.numberOfGamesPlayed
  );
  const setNumberOfGamesPlayed = useGameStore(
    (state) => state.setNumberOfGamesPlayed
  );
  const setLevelCompleted = useGameStore((state) => state.setLevelCompleted);
  const setLevelStats = useGameStore((state) => state.setLevelStats);
  const calculateGameScore = useGameStore((state) => state.calculateGameScore);

  const onOpen = useCompletionModal((state) => state.onOpen);

  const levelTimer = useLevelTimer();

  const [cards, setCards] = useState<CardType[]>(() => {
    const duplicatedImages = [...images, ...images];
    const shuffledImages = shuffleArray(duplicatedImages);

    return shuffledImages.map((imageUrl, index) => ({
      id: index,
      imageUrl,
      isFlipped: false,
      isMatched: false,
    }));
  });

  useEffect(() => {
    if (status === "ended") {
      calculateGameScore(); // Calculate game score when game ends
      setTimeout(() => {
        // Timeout For better UX
        onOpen(); // and show game completion modal
        gameWon.play();
      }, 1000);
      setNumberOfGamesPlayed((prev) => prev + 1); // Update player's total number of games played
    }
  }, [status, calculateGameScore, onOpen, setNumberOfGamesPlayed]);

  // Update game status to 'ended' when all cards have been matched
  useEffect(() => {
    if (cards.length === 0) return; // ensure there are cards

    const allCardsMatched = cards.every((card) => card.isMatched);

    if (allCardsMatched && status !== "ended") {
      // Toggle game state to 'ended' if all cards are matched
      setGameStatus("ended");
    }

    // Update when player successfully completes a level
    if (allCardsMatched && status === "ended") {
      setLevelCompleted(true);
      setLevelStats({ isCompleted: true });
    }
  }, [cards, status, setGameStatus, setLevelCompleted, setLevelStats]);

  // Update the number of matched pairs
  useEffect(() => {
    if (cards.length === 0) return;
    // Count matched pairs
    const matchedPairs = cards.filter((card) => card.isMatched).length / 2;
    setNumberOfMatches(matchedPairs); // Update Zustand store
  }, [cards, setNumberOfMatches]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        {/** Set game status to 'ended' when timer runs out **/}
        <Timer
          timeInSeconds={levelTimer}
          onComplete={() => setGameStatus("ended")}
        />
        <ScoreBoard />
      </div>
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {cards.map((card) => (
          <Card key={card.id} card={card} setCards={setCards} />
        ))}
      </div>
      <p className="text-center mt-4">
        Games played: <span className="font-bold">{numberOfGamesPlayed}</span>
      </p>
      <Controls />
    </div>
  );
};

export default MemoryGame;
