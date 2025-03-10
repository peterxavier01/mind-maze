import MemoryGame from "@/components/memory-game";

import { useCurrentLevelId } from "@/hooks/use-current-level-id";
import { useCurrentLevelImages } from "@/hooks/use-current-level-images";

function App() {
  const currentLevelId = useCurrentLevelId();
  const selectedImages = useCurrentLevelImages();

  return (
    <main className="flex flex-col items-center justify-center max-w-5xl w-full mx-auto p-4 min-h-dvh">
      {/** Adding a key prop helps re-render the component whenever there is a change in the currentLevelId
       * In our case, whenever the levelSelector component changes the game level, this component re-renders.
       * This is an alternative to the useEffect approach inside the MemoryCard component. setCards has its initial value provided in useState,
       * which causes the component not to re-render as it does not track the changes in the currentLevelId
       * Additionally, this key prop also causes all the children of MemoryGame component to re-render including the Timer component
       */}
      <MemoryGame key={currentLevelId} images={selectedImages} />
    </main>
  );
}

export default App;
