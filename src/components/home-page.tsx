import { motion } from "framer-motion";
import { Play, Target, Star, Brain } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/toggle-theme";

import useGameStore from "@/store/use-game-store";
import { cn, gameFeatures, gameLevels, gameStats } from "@/lib/utils";
import {
  heroVariants,
  containerVariants,
  itemVariants,
  buttonVariants,
  cardVariants,
  floatingVariants,
  statsVariants,
} from "@/lib/animations";

interface HomePageProps {
  onStartGame: () => void;
}

const HomePage = ({ onStartGame }: HomePageProps) => {
  const currentLevelId = useGameStore((state) => state.currentLevelId);
  const numberOfGamesPlayed = useGameStore(
    (state) => state.numberOfGamesPlayed
  );

  const currentLevel = gameLevels.find((level) => level.id === currentLevelId);
  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center p-2 sm:p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        className="absolute top-8 sm:top-10 left-4 sm:left-10 opacity-20 dark:opacity-30"
      >
        <Brain className="size-10 sm:size-12 md:size-16 text-teal-600 dark:text-teal-400 drop-shadow-lg" />
      </motion.div>

      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        className="absolute top-16 sm:top-20 right-6 sm:right-16 opacity-15 dark:opacity-25"
        style={{ animationDelay: "2s" }}
      >
        <Target className="size-8 sm:size-10 md:size-12 text-indigo-600 dark:text-indigo-400 drop-shadow-lg" />
      </motion.div>

      <motion.div
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        className="absolute bottom-16 sm:bottom-20 left-6 sm:left-20 opacity-15 dark:opacity-25"
        style={{ animationDelay: "4s" }}
      >
        <Star className="size-10 sm:size-12 md:size-14 text-amber-600 dark:text-amber-400 drop-shadow-lg" />
      </motion.div>

      {/* Header with theme toggle */}
      <motion.div
        variants={itemVariants}
        initial="initial"
        animate="animate"
        className="absolute top-4 sm:top-6 right-4 sm:right-6"
      >
        <ModeToggle />
      </motion.div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="max-w-4xl w-full text-center space-y-6 sm:space-y-8"
      >
        {/* Title and subtitle */}
        <motion.div variants={heroVariants} className="space-y-3 sm:space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 dark:from-teal-400 dark:via-blue-400 dark:to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
            Mind Maze
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed px-4">
            Challenge your memory and sharpen your mind in this exciting card
            matching adventure
          </p>
        </motion.div>

        {/* Game preview cards */}
        <motion.div
          variants={containerVariants}
          className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8"
        >
          {["/cards/sword.svg", "/cards/shield.svg", "/cards/diamond.svg"].map(
            (card, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="relative"
              >
                <img
                  src={card}
                  alt="preview card"
                  className="w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24 rounded-lg shadow-2xl bg-white/80 dark:bg-slate-700/50 backdrop-blur-sm border border-slate-300/70 dark:border-slate-600/50 p-1.5 sm:p-2 hover:bg-slate-50 dark:hover:bg-slate-600/50 transition-all duration-300"
                />
              </motion.div>
            )
          )}
        </motion.div>
        {/* Current level display */}
        <motion.div variants={itemVariants} className="space-y-2">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Current Level
          </p>
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-300/70 dark:border-slate-600/50 px-4 py-2 rounded-full shadow-lg">
            <Target className="size-5 text-teal-600 dark:text-teal-400" />
            <span className="font-semibold text-lg text-slate-800 dark:text-slate-200">
              {currentLevel?.name} ({currentLevel?.cardTypes} pairs)
            </span>
          </div>
        </motion.div>
        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-3 gap-2 md:gap-6 mb-8 relative z-10"
        >
          {gameStats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={statsVariants}
              whileHover="hover"
              className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-sm border border-slate-300/50 dark:border-slate-600/30 rounded-xl p-6 text-center space-y-2 shadow-xl hover:bg-white/80 dark:hover:bg-slate-700/40 transition-all duration-300"
            >
              <stat.icon className={cn("size-8 mx-auto", stat.color)} />
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {stat.stat}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
        {/* Features */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10"
        >
          {gameFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="text-center space-y-2"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border shadow-lg",
                  index === 0
                    ? "bg-purple-200/60 dark:bg-purple-500/20 border-purple-400/50 dark:border-purple-400/30"
                    : index === 1
                    ? "bg-teal-200/60 dark:bg-teal-500/20 border-teal-400/50 dark:border-teal-400/30"
                    : index === 2
                    ? "bg-emerald-200/60 dark:bg-emerald-500/20 border-emerald-400/50 dark:border-emerald-400/30"
                    : "bg-amber-200/60 dark:bg-amber-500/20 border-amber-400/50 dark:border-amber-400/30"
                )}
              >
                <feature.icon className={cn("size-6", feature.color)} />
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {feature.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
        {/* Play button */}
        <motion.div
          variants={itemVariants}
          className="w-max mx-auto relative z-10"
        >
          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              onClick={onStartGame}
              size="lg"
              className="text-xl px-8 py-6 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 shadow-2xl border-0 text-white font-semibold hover:shadow-teal-500/25 transition-all duration-300"
            >
              <Play className="size-6 mr-2" />
              {numberOfGamesPlayed > 1 ? "Continue Playing" : "Start Playing"}
            </Button>
          </motion.div>
        </motion.div>
        {/* Game tip */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400 italic">
            💡 Tip: Match pairs of cards before time runs out to score points!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
