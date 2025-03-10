import { useEffect, useState } from "react";

import Timer from "./timer";
import ScoreBoard from "./score-board";
import Card from "./card";
import Controls from "./controls";

import useGameStore from "@/store/use-game-store";
import useCompletionModal from "@/store/use-completion-modal";

import { cn, gameLevels, shuffleArray } from "../lib/utils";

import { Card as CardType } from "../types";

import { gameWon } from "@/lib/sounds";
import { useLevelTimer } from "@/hooks/use-level-timer";
import { useCurrentLevelId } from "@/hooks/use-current-level-id";

interface MemoryGameProps {
  images: string[];
}

const MemoryGame = ({ images }: MemoryGameProps) => {
  const status = useGameStore((state) => state.status);
  const gameScore = useGameStore((state) => state.gameScore);
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
  const setGameScore = useGameStore((state) => state.setGameScore);
  const setTimeTaken = useGameStore((state) => state.setTimeTaken);
  const setPlayerRating = useGameStore((state) => state.setPlayerRating);
  const calculateGameScore = useGameStore((state) => state.calculateGameScore);

  const onOpen = useCompletionModal((state) => state.onOpen);

  // Get previous rating from localStorage
  const store = localStorage.getItem("game-store");
  const parsedStore = store ? JSON.parse(store) : null;
  const newRating = parsedStore.state.playerRating || 0;

  const levelTimer = useLevelTimer();
  const currentLevelId = useCurrentLevelId();
  const selectedLevel = gameLevels.find((level) => level.id === currentLevelId);

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

  // Reset game level
  const resetGameLevel = () => {
    setCards((prevCards) => {
      return prevCards.map((card) => ({
        ...card,
        isFlipped: false,
        isMatched: false,
      }));
    });

    setLevelStats({ isCompleted: false, bestTime: 0 }); // Reset game completion state
    setGameStatus("pending"); // Reset game status
    setPlayerRating(newRating - gameScore); // Reset player rating to previous rating
    setGameScore(0); // Reset game score
    setTimeTaken(0); // Reset time taken
    setNumberOfGamesPlayed((prev) => prev - 1); // Revert total game played to previous value
  };

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
      <div
        className={cn(
          "grid gap-2 md:gap-4",
          selectedLevel && selectedLevel.cardTypes <= 8
            ? "grid-cols-4"
            : "grid-cols-4 md:grid-cols-6"
        )}
      >
        {cards.map((card) => (
          <Card key={card.id} card={card} setCards={setCards} />
        ))}
      </div>
      <p className="text-center mt-4">
        Games played: <span className="font-bold">{numberOfGamesPlayed}</span>
      </p>
      <Controls resetLevel={resetGameLevel} />
    </div>
  );
};

export default MemoryGame;
