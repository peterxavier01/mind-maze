import useGameStore from "@/store/use-game-store";

import { Card as CardType } from "../types";

import { cardFlip, cardMatch, incorrectMatch } from "@/lib/sounds";
import { cn } from "@/lib/utils";

interface CardProps {
  card: CardType;
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
}

const cardSize = "w-[80px] h-[80px] md:w-[120px] md:h-[160px]";

const Card = ({ card, setCards }: CardProps) => {
  const consecutiveMatches = useGameStore((state) => state.consecutiveMatches);
  const incorrectMatches = useGameStore((state) => state.incorrectMatches);
  const currentLevelId = useGameStore((state) => state.currentLevelId);
  const setConsecutiveMatches = useGameStore(
    (state) => state.setConsecutiveMatches
  );
  const setIncorrectMatches = useGameStore(
    (state) => state.setIncorrectMatches
  );

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
    >
      <img
        src={cardCover}
        alt="card-cover"
        className={cn(
          cardSize,
          "absolute inset-0 max-w-full max-h-full rounded-md shadow-lg transform transition-transform duration-300 ease-in-out"
        )}
        style={{
          backfaceVisibility: "hidden",
          zIndex: card.isFlipped ? 0 : 1,
          transform:
            card.isFlipped || card.isMatched
              ? "rotateY(180deg)"
              : "rotateY(0deg)",
        }}
      />
      <img
        src={card.imageUrl}
        alt="card"
        className={cn(
          cardSize,
          "block max-w-full max-h-full bg-gray-200 p-4 rounded-md shadow-lg transform transition-transform duration-300 ease-in-out"
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
