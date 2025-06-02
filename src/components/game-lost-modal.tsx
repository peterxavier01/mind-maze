import { XCircle, RotateCcw, Home, Clock } from "lucide-react";

import Modal from "./modal";
import { Button } from "./ui/button";

import useGameStore from "@/store/use-game-store";
import useGameLostModal from "@/store/use-game-lost-modal";

const GameLostModal = () => {
  const isOpen = useGameLostModal((state) => state.isOpen);
  const onClose = useGameLostModal((state) => state.onClose);

  const numberOfMatches = useGameStore((state) => state.numberOfMatches);
  const currentLevelId = useGameStore((state) => state.currentLevelId);
  const setCurrentPage = useGameStore((state) => state.setCurrentPage);
  const resetCurrentLevel = useGameStore((state) => state.resetCurrentLevel);
  const handleTryAgain = () => {
    onClose();
    resetCurrentLevel();
  };

  const handleGoHome = () => {
    onClose();
    setCurrentPage("home");
  };
  return (
    <Modal
      title=""
      description=""
      isOpen={isOpen}
      onChange={(open) => !open && onClose()}
    >
      <div className="flex flex-col items-center text-center space-y-6 p-6">
        {/* Game Over Icon */}
        <div className="relative">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center border-2 border-red-500/40 backdrop-blur-sm">
            <XCircle className="w-10 h-10 text-red-400" />
          </div>
          <Clock className="w-6 h-6 text-slate-400 absolute -bottom-1 -right-1 bg-slate-800 rounded-full p-1" />
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-red-400 mb-2">
            Time's Up!
          </h2>
          <p className="text-slate-300 text-sm md:text-base">
            Better luck next time! Keep practicing to improve your memory
            skills.
          </p>
        </div>

        {/* Game Stats */}
        <div className="w-full max-w-sm">
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 rounded-lg">
            <div className="text-center">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                Level
              </p>
              <p className="text-2xl font-bold text-slate-200">
                {currentLevelId}
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                Matches
              </p>
              <p className="text-2xl font-bold text-amber-400">
                {numberOfMatches}
              </p>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-600/20 rounded-lg p-4 max-w-sm">
          <p className="text-slate-300 text-sm">
            {numberOfMatches === 0
              ? "Don't give up! Memory games get easier with practice."
              : numberOfMatches === 1
              ? "You got one match! You're on the right track."
              : `Great progress! You matched ${numberOfMatches} pairs before time ran out.`}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <Button
            onClick={handleTryAgain}
            className="flex-1 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white border border-teal-500/30 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Button
            onClick={handleGoHome}
            variant="outline"
            className="flex-1 border-slate-600/40 bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 backdrop-blur-sm"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GameLostModal;
