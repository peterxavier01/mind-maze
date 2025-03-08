import { Forward, Play, X } from "lucide-react";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";

import useCompletionModal from "@/store/use-completion-modal";
import useGameStore from "@/store/use-game-store";

import { useGoToNextLevel } from "@/hooks/use-go-to-next-level";

const CompletionModal = () => {
  const isOpen = useCompletionModal((state) => state.isOpen);
  const onClose = useCompletionModal((state) => state.onClose);

  const status = useGameStore((state) => state.status);
  const gameScore = useGameStore((state) => state.gameScore);
  const highScore = useGameStore((state) => state.highScore);
  const currentLevelId = useGameStore((state) => state.currentLevelId);

  const finalLevel = currentLevelId === 5;

  const goToNextLevel = useGoToNextLevel();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Good Game!"
      isOpen={isOpen}
      onChange={onChange}
      className="w-full max-w-xl mx-auto"
    >
      <img
        src="/trophy.svg"
        alt="trophy"
        className="size-24 md:size-32 mx-auto mt-6"
      />

      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="flex items-center gap-2">
          <span className="font-bold md:text-lg bg-orange-500 p-2 rounded-md">
            +{gameScore}
          </span>
          points
        </div>

        <p>
          Best: <span className="font-bold md:text-lg">{highScore}</span> points
        </p>
      </div>

      <div className="flex justify-center gap-8 mt-6 items-center">
        <Button onClick={onClose} className="cursor-pointer">
          <X />
        </Button>
        <Button disabled={status === "ended"}>
          <Play /> Start
        </Button>
        <Button
          className="cursor-pointer"
          onClick={goToNextLevel}
          disabled={finalLevel}
        >
          <Forward /> Next
        </Button>
      </div>
    </Modal>
  );
};

export default CompletionModal;
