import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  BASIC_SCORING_POINTS,
  LEVEL_COMPLETION_POINTS,
  PENALTIES_POINTS,
  STREAK_BONUS_POINTS,
  TIME_BONUS_POINTS,
} from "@/lib/constants";
import { gameLevels } from "@/lib/utils";

import { Level } from "@/types";

interface LevelStat {
  currentLevel: Level;
  isCompleted: boolean;
  bestTime: number;
}

interface GameStore {
  status: "paused" | "running" | "pending" | "ended";
  isGameRunning: boolean;
  gameScore: number;
  highScore: number;
  playerRating: number;
  numberOfGamesPlayed: number;
  numberOfMatches: number;
  timeTaken: number;
  consecutiveMatches: number;
  incorrectMatches: number;
  levelCompleted: boolean;
  currentLevelId: number;
  setCurrentLevelId: (id: number) => void;
  setLevel: (levelId: number) => void; // Synced method for updating both currentId & levelStats
  levelStats: LevelStat;
  setLevelStats: (newStats: Partial<LevelStat>) => void;
  setGameScore: (score: number) => void;
  setPlayerRating: (rating: number) => void;
  setNumberOfGamesPlayed: (update: number | ((prev: number) => number)) => void;
  setIsGameRunning: (isRunning: boolean) => void;
  setGameStatus: (status: "paused" | "running" | "pending" | "ended") => void;
  toggleGameStatus: () => void;
  setNumberOfMatches: (matches: number) => void;
  setTimeTaken: (timeTaken: number) => void;
  setConsecutiveMatches: (matches: number) => void;
  setIncorrectMatches: (matches: number) => void;
  setLevelCompleted: (completed: boolean) => void;
  calculateGameScore: () => void;
}

const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      status: "pending",
      isGameRunning: false,
      gameScore: 0,
      highScore: 0,
      playerRating: 0,
      numberOfGamesPlayed: 0,
      numberOfMatches: 0,
      consecutiveMatches: 0,
      incorrectMatches: 0,
      timeTaken: 0,
      levelCompleted: false,
      currentLevelId: 1,
      setCurrentLevelId: (id) => set({ currentLevelId: id }),
      levelStats: { currentLevel: "Beginner", bestTime: 0, isCompleted: false },

      setLevel: (levelId) => {
        const levelName = gameLevels.find(
          (level) => level.id === levelId
        )?.name;

        if (levelName) {
          set({
            currentLevelId: levelId,
            levelStats: {
              currentLevel: levelName,
              bestTime: 0,
              isCompleted: false,
            },
          });
        }
      },
      setLevelStats: (newStats) =>
        set((state) => ({
          levelStats: { ...state.levelStats, ...newStats },
        })),
      setNumberOfGamesPlayed: (gamesPlayed) =>
        set((state) => ({
          numberOfGamesPlayed:
            typeof gamesPlayed === "function"
              ? gamesPlayed(state.numberOfGamesPlayed)
              : gamesPlayed,
        })),
      setGameScore: (score) => set({ gameScore: score }),
      setPlayerRating: (rating) => set({ playerRating: rating }),
      setIsGameRunning: (isRunning) => set({ isGameRunning: isRunning }),
      setGameStatus: (status) => set({ status }),
      toggleGameStatus: () =>
        set((state) => ({
          status: state.status === "running" ? "paused" : "running",
          isGameRunning: state.status !== "running",
        })),
      setNumberOfMatches: (matches) => set({ numberOfMatches: matches }),
      setTimeTaken: (timeTaken) => set({ timeTaken }),
      setConsecutiveMatches: (matches) => set({ consecutiveMatches: matches }),
      setIncorrectMatches: (matches) => set({ incorrectMatches: matches }),
      setLevelCompleted: (completed) => set({ levelCompleted: completed }),

      calculateGameScore: () =>
        set((state) => {
          let score =
            state.numberOfMatches * BASIC_SCORING_POINTS - // Basic scoring: points per correct match
            state.incorrectMatches * PENALTIES_POINTS; // Deduct points for incorrect matches

          // Time bonus: reward for making quick matches
          if (state.timeTaken <= 20) score += TIME_BONUS_POINTS;

          // Streak bonus: extra points for consecutive matches
          score += state.consecutiveMatches * STREAK_BONUS_POINTS;

          // Level completion bonus
          if (state.levelCompleted) score += LEVEL_COMPLETION_POINTS;

          // Extract previous playerRating from localStorage
          const store = localStorage.getItem("game-store");
          const parsedStore = store ? JSON.parse(store) : null;
          const previousRating = parsedStore.state.playerRating || 0;
          const previousTime = parsedStore?.state?.timeTaken || Infinity;

          return {
            gameScore: score,
            highScore: Math.max(state.highScore, score), // Automatically update high score if beaten
            playerRating: score + previousRating,
            levelStats: {
              ...state.levelStats,
              bestTime: Math.min(state.timeTaken, previousTime),
            },
          };
        }),
    }),
    {
      name: "game-store", // Key for localStorage
      partialize: (state) => ({
        highScore: state.highScore,
        playerRating: state.playerRating,
        numberOfGamesPlayed: state.numberOfGamesPlayed,
        levelStats: state.levelStats,
        currentLevelId: state.currentLevelId,
        timeTaken: state.timeTaken,
      }), // Persist only necessary state values
    }
  )
);

export default useGameStore;
