import { create } from "zustand";

interface CompletionModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCompletionModal = create<CompletionModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCompletionModal;
