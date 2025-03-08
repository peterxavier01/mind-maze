import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

const Modal = ({
  title,
  description,
  isOpen,
  onChange,
  children,
  className,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <DialogContent
        className={cn(
          "overflow-y-auto max-h-[90vh] my-auto font-questrial",
          className
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-xl md:text-4xl text-center font-inter font-bold capitalize">
            {title}
          </DialogTitle>
          <DialogDescription
            className={cn(
              "font-inter font-medium",
              !description && "hidden sr-only"
            )}
          >
            {description}
          </DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
