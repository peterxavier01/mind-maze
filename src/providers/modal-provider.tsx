import { useEffect, useState } from "react";

import CompletionModal from "@/components/completion-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return null;

  return <CompletionModal />;
};

export default ModalProvider;
