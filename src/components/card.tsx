import useGameStore from "@/store/use-game-store";

import { Card as CardType } from "../types";

import { cardFlip, cardMatch, incorrectMatch } from "@/lib/sounds";
import { cn } from "@/lib/utils";

interface CardProps {
  card: CardType;
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
}

const Card = ({ card, setCards }: CardProps) => {
  const consecutiveMatches = useGameStore((state) => state.consecutiveMatches);
  const incorrectMatches = useGameStore((state) => state.incorrectMatches);
  const currentLevelId = useGameStore((state) => state.currentLevelId);
  const setConsecutiveMatches = useGameStore(
    (state) => state.setConsecutiveMatches
  );
  const setIncorrectMatches = useGameStore(
    (state) => state.setIncorrectMatches
  );  // Dynamic card sizing based on level and screen size
  const getCardSize = () => {
    if (currentLevelId <= 2) {
      // Beginner (id: 1) and Easy (id: 2) - Same size, nice and large
      return "w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36";
    } else if (currentLevelId <= 4) {
      // Medium (id: 3) and Hard (id: 4) - Medium size
      return "w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32";
    } else {
      // Expert (id: 5) - Smaller but still reasonably sized
      return "w-18 h-22 sm:w-20 sm:h-24 md:w-24 md:h-28";
    }
  };

  const cardCover =
    currentLevelId !== 5 ? "/card-cover-1.png" : "/card-cover-2.png";

  function handleCardMatched(cardOne: CardType, cardTwo: CardType) {
    const isMatch = cardOne.imageUrl === cardTwo.imageUrl;

    // setTimeout create a delay in setting the cards for better UX
    setTimeout(() => {
      setCards((prevCards) => {
        const newCards = [...prevCards];

        if (isMatch) {
          newCards[cardOne.id].isMatched = true;
          newCards[cardTwo.id].isMatched = true;
        } else {
          newCards[cardOne.id].isFlipped = false;
          newCards[cardTwo.id].isFlipped = false;
        }

        return newCards;
      });

      if (isMatch) {
        // Increase consecutive match count
        setConsecutiveMatches(consecutiveMatches + 1);
        cardMatch.play();
      } else {
        // Reset consecutive matches and increase incorrect matches
        setConsecutiveMatches(0); // Streak is broken, reset
        setIncorrectMatches(incorrectMatches + 1);
        incorrectMatch.play();
      }
    }, 600);
  }

  function handleCardSelect(card: CardType) {
    const gameStatus = useGameStore.getState().status;

    if (card.isFlipped || card.isMatched || gameStatus !== "running") return;

    cardFlip.play();

    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[card.id].isFlipped = true;

      const flippedCards = newCards.filter(
        (card) => card.isFlipped && !card.isMatched
      );

      if (flippedCards.length === 2) {
        // Only run this when two cards have been flipped
        handleCardMatched(flippedCards[0], flippedCards[1]);
      }

      return newCards;
    });
  }

  return (
    <div
      key={card.id}
      className="relative"
      onClick={() => handleCardSelect(card)}
    >      <img
        src={cardCover}
        alt="card-cover"
        className={cn(
          getCardSize(),
          "absolute inset-0 max-w-full max-h-full rounded-lg shadow-xl border border-slate-600/30 transform transition-transform duration-300 ease-in-out hover:shadow-2xl"
        )}
        style={{
          backfaceVisibility: "hidden",
          zIndex: card.isFlipped ? 0 : 1,
          transform:
            card.isFlipped || card.isMatched
              ? "rotateY(180deg)"
              : "rotateY(0deg)",
        }}
      />      <img
        src={card.imageUrl}
        alt="card"
        className={cn(
          getCardSize(),
          "block max-w-full max-h-full bg-slate-700/50 backdrop-blur-sm border border-slate-600/40 p-4 rounded-lg shadow-xl transform transition-transform duration-300 ease-in-out hover:bg-slate-600/50"
        )}
        style={{
          backfaceVisibility: "hidden",
          zIndex: card.isFlipped ? 1 : 0,
          transform:
            card.isFlipped || card.isMatched
              ? "rotateY(0deg)"
              : "rotateY(180deg)",
        }}
      />
    </div>
  );
};

export default Card;
