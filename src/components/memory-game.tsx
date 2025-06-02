import { useEffect, useState } from "react";

import Timer from "./timer";
import ScoreBoard from "./score-board";
import PlayerRating from "./player-rating";
import Card from "./card";
import Controls from "./controls";

import useGameStore from "@/store/use-game-store";
import useCompletionModal from "@/store/use-completion-modal";
import useGameLostModal from "@/store/use-game-lost-modal";

import { cn, gameLevels, shuffleArray } from "../lib/utils";

import { Card as CardType } from "../types";

import { gameWon, gameOver } from "@/lib/sounds";
import { useLevelTimer } from "@/hooks/use-level-timer";
import { useCurrentLevelId } from "@/hooks/use-current-level-id";

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
  const resetCurrentLevel = useGameStore((state) => state.resetCurrentLevel);
  const onOpen = useCompletionModal((state) => state.onOpen);
  const onOpenGameLost = useGameLostModal((state) => state.onOpen);

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
    // Use the store's reset function to cleanly reset all game state
    resetCurrentLevel();

    // Reshuffle cards with new positions for a fresh experience
    setCards(() => {
      const duplicatedImages = [...images, ...images];
      const shuffledImages = shuffleArray(duplicatedImages);

      return shuffledImages.map((imageUrl, index) => ({
        id: index,
        imageUrl,
        isFlipped: false,
        isMatched: false,
      }));
    });

    // Reset level stats
    setLevelStats({ isCompleted: false });
  };

  useEffect(() => {
    if (status === "ended") {
      calculateGameScore(); // Calculate game score when game ends

      // Check if all cards are matched (game completed successfully)
      const allCardsMatched = cards.every((card) => card.isMatched);

      if (allCardsMatched) {
        // Game was completed successfully
        setTimeout(() => {
          onOpen(); // Show completion modal
          gameWon.play();
        }, 1000);
        setNumberOfGamesPlayed((prev) => prev + 1); // Update player's total number of games played
      }
      // If not all cards matched, the timer onComplete will handle showing game lost modal
    }
  }, [status, calculateGameScore, onOpen, setNumberOfGamesPlayed, cards]);

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
    <div className="w-full px-2 sm:px-4">
      {" "}
      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6 p-2 sm:p-3 md:p-4 bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-xl">
        {/** Set game status to 'ended' when timer runs out **/}
        <Timer
          timeInSeconds={levelTimer}
          onComplete={() => {
            setGameStatus("ended");
            // Check if game was completed vs time ran out
            const allCardsMatched = cards.every((card) => card.isMatched);
            if (!allCardsMatched) {
              // Time ran out without completing the game
              setTimeout(() => {
                onOpenGameLost();
                gameOver.play();
              }, 1000);
            }
          }}
        />
        <div className="flex items-center gap-2 sm:gap-3">
          <PlayerRating />
          <ScoreBoard />
        </div>
      </div>
      <div className="flex justify-center">
        <div
          className={cn(
            "grid gap-2 md:gap-3 p-4 md:p-6 bg-slate-800/20 backdrop-blur-sm border border-slate-600/20 rounded-xl w-fit mx-auto",
            selectedLevel && selectedLevel.cardTypes <= 2
              ? "grid-cols-2 max-w-xs"
              : selectedLevel && selectedLevel.cardTypes <= 4
              ? "grid-cols-2 sm:grid-cols-4 max-w-xl"
              : selectedLevel && selectedLevel.cardTypes <= 8
              ? "grid-cols-4 max-w-xl"
              : "grid-cols-4 md:grid-cols-6 max-w-4xl"
          )}
        >
          {cards.map((card) => (
            <Card key={card.id} card={card} setCards={setCards} />
          ))}
        </div>
      </div>
      <p className="text-center mt-3 sm:mt-4 md:mt-6 text-slate-300 text-xs sm:text-sm md:text-base px-2 sm:px-4">
        Games played:{" "}
        <span className="font-bold text-teal-400">{numberOfGamesPlayed}</span>
      </p>
      <Controls resetLevel={resetGameLevel} />
    </div>
  );
};

export default MemoryGame;
