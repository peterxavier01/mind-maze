export interface Card {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type Level = "Beginner" | "Easy" | "Medium" | "Hard" | "Expert";

export type GameLevel = {
  id: number;
  name: Level;
  cardTypes: number;
  timeLimit: number;
};
