import { Forward, Play, X, Home } from "lucide-react";

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
  const setCurrentPage = useGameStore((state) => state.setCurrentPage);

  const finalLevel = currentLevelId === 5;

  const goToNextLevel = useGoToNextLevel();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleGoHome = () => {
    setCurrentPage("home");
    onClose();
  };
  return (
    <Modal
      title="Good Game!"
      isOpen={isOpen}
      onChange={onChange}
      className="w-full max-w-xl mx-auto bg-slate-800/95 backdrop-blur-lg border border-slate-600/40"
    >
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6">
        <img
          src="/trophy.svg"
          alt="trophy"
          className="size-24 md:size-32 mx-auto mt-2 drop-shadow-2xl"
        />

        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="flex items-center gap-3 bg-slate-700/50 backdrop-blur-sm border border-slate-600/30 rounded-lg p-4 shadow-xl">
            <span className="font-bold text-xl bg-gradient-to-r from-amber-400 to-orange-500 text-black px-4 py-2 rounded-lg shadow-lg">
              +{gameScore}
            </span>
            <span className="text-slate-200 font-medium">points</span>
          </div>

          <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/20 rounded-lg px-6 py-3">
            <p className="text-slate-300">
              Best: <span className="font-bold text-xl text-teal-400">{highScore}</span> <span className="text-slate-400">points</span>
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-8 items-center flex-wrap">
          <Button 
            variant="outline"
            onClick={handleGoHome} 
            className="cursor-pointer bg-slate-700/50 border-slate-600/40 text-slate-200 hover:bg-slate-600/60 hover:text-white"
          >
            <Home className="size-4" />
            Home
          </Button>
          <Button 
            onClick={onClose} 
            className="cursor-pointer bg-slate-600 hover:bg-slate-700 text-white border-0 shadow-lg"
          >
            <X className="size-4" />
            Close
          </Button>
          <Button 
            disabled={status === "ended"}
            className="bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-lg hover:shadow-teal-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="size-4" /> 
            Start
          </Button>
          <Button
            className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={goToNextLevel}
            disabled={finalLevel}
          >
            <Forward className="size-4" /> 
            Next
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CompletionModal;
