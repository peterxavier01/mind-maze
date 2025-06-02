import { motion, AnimatePresence } from "framer-motion";

import MemoryGame from "@/components/memory-game";
import HomePage from "@/components/home-page";

import useGameStore from "@/store/use-game-store";

import { useCurrentLevelId } from "@/hooks/use-current-level-id";
import { useCurrentLevelImages } from "@/hooks/use-current-level-images";

import { pageVariants } from "@/lib/animations";

function App() {
  const currentLevelId = useCurrentLevelId();
  const selectedImages = useCurrentLevelImages();
  const currentPage = useGameStore((state) => state.currentPage);
  const setCurrentPage = useGameStore((state) => state.setCurrentPage);
  const startNewGame = useGameStore((state) => state.startNewGame);

  const handleStartGame = () => {
    startNewGame(); // Initialize pre-game rating when starting from home
    setCurrentPage("game");
  };

  return (
    <div className="overflow-x-hidden dark:app-gradient app-gradient-light">
      <AnimatePresence mode="wait">
        {currentPage === "home" ? (
          <motion.div
            key="homepage"
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            className="w-full"
          >
            <HomePage onStartGame={handleStartGame} />
          </motion.div>
        ) : (
          <motion.div
            key="gamepage"
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            className="w-full"
          >
            <main className="flex flex-col items-center justify-center max-w-5xl w-full mx-auto p-4 min-h-dvh">
              {/** Adding a key prop helps re-render the component whenever there is a change in the currentLevelId
               * In our case, whenever the levelSelector component changes the game level, this component re-renders.
               * This is an alternative to the useEffect approach inside the MemoryCard component. setCards has its initial value provided in useState,
               * which causes the component not to re-render as it does not track the changes in the currentLevelId
               * Additionally, this key prop also causes all the children of MemoryGame component to re-render including the Timer component
               */}
              <MemoryGame key={currentLevelId} images={selectedImages} />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
