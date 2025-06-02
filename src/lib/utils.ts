import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Brain, Clock, Star, Target, Trophy } from "lucide-react";

import { GameLevel } from "@/types";

import useGameStore from "@/store/use-game-store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Fisher-Yates Shuffle algorithm
export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    // swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Format time
export const formatTime = (secs: number) => {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

// Game level config
export const gameLevels: GameLevel[] = [
  { id: 1, name: "Beginner", cardTypes: 2, timeLimit: 15 },
  { id: 2, name: "Easy", cardTypes: 4, timeLimit: 30 },
  { id: 3, name: "Medium", cardTypes: 8, timeLimit: 60 },
  { id: 4, name: "Hard", cardTypes: 12, timeLimit: 90 },
  { id: 5, name: "Expert", cardTypes: 18, timeLimit: 120 },
];

export const cardImages = [
  "/cards/arrow.svg",
  "/cards/boot.svg",
  "/cards/diamond.svg",
  "/cards/potion.svg",
  "/cards/ruby.svg",
  "/cards/shield.svg",
  "/cards/sword.svg",
  "/cards/spear.svg",
  "/cards/checkerboard.svg",
  "/cards/question.svg",
  "/cards/axe.svg",
  "/cards/helmet.svg",
  "/cards/gun.svg",
  "/cards/horse.svg",
  "/cards/kunai.svg",
  "/cards/ninja.svg",
  "/cards/ninja2.svg",
  "/cards/strawberry.svg",
];

const highScore = useGameStore.getState().highScore;
const playerRating = useGameStore.getState().playerRating;
const numberOfGamesPlayed = useGameStore.getState().numberOfGamesPlayed;

export const gameStats = [
  {
    id: "best-score",
    icon: Trophy,
    title: "Best Score",
    stat: highScore,
    color: "text-amber-400",
  },
  {
    id: "rating",
    icon: Star,
    title: "Rating",
    stat: playerRating,
    color: "text-purple-400",
  },
  {
    id: "games-played",
    icon: Clock,
    title: "Games Played",
    stat: numberOfGamesPlayed,
    color: "text-teal-400",
  },
];

export const gameFeatures = [
  {
    id: "memory-training",
    title: "Memory Training",
    icon: Brain,
    color: "text-purple-400",
  },
  {
    id: "difficulty-levels",
    title: "5 Difficulty Levels",
    icon: Target,
    color: "text-teal-400",
  },
  {
    id: "timed-challenges",
    title: "Timed Challenges",
    icon: Clock,
    color: "text-emerald-400",
  },
  {
    id: "score-system",
    title: "Score System",
    icon: Trophy,
    color: "text-amber-400",
  },
];
