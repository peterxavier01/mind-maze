import { useEffect, useState } from "react";

import CompletionModal from "@/components/completion-modal";
import GameLostModal from "@/components/game-lost-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return null;
  return (
    <>
      <CompletionModal />
      <GameLostModal />
    </>
  );
};

export default ModalProvider;
