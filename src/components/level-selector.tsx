import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useGameStore from "@/store/use-game-store";

import { gameLevels } from "@/lib/utils";

const LevelSelector = () => {
  const currentLevelId = useGameStore((state) => state.currentLevelId);
  const setLevel = useGameStore((state) => state.setLevel);
  const setGameStatus = useGameStore((state) => state.setGameStatus);

  // Initialize selected level from the store
  const [selectedLevel, setSelectedLevel] = useState(
    () => currentLevelId?.toString() || ""
  );

  return (
    <Select
      value={selectedLevel}
      onValueChange={(value) => {
        const levelId = Number(value);
        setLevel(levelId); // This will update both currentLevelId and levelStats
        setGameStatus("pending"); // Reset game status

        const currentLevel = gameLevels.find(
          (level) => level.id === levelId
        )?.name;
        if (currentLevel) setSelectedLevel(value);
      }}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select level" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Levels</SelectLabel>
          {gameLevels.map((level) => (
            <SelectItem key={level.id} value={level.id.toString()}>
              {level.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LevelSelector;
