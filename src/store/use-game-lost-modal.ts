import { create } from "zustand";

interface GameLostModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useGameLostModal = create<GameLostModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useGameLostModal;
