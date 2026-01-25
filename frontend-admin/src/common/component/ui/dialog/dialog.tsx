import { createPortal } from "react-dom";
import { useEffect } from "react";
import clsx from "clsx";

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

export function Dialog({
  open,
  onClose,
  children,
  className,
  overlayClassName,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: DialogProps) {
  useEffect(() => {
    if (!closeOnEsc) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose?.();
      }
    }

    if (open) {
      document.addEventListener("keydown", handleKey);
    }

    return () => document.removeEventListener("keydown", handleKey);
  }, [open, closeOnEsc, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/40",
        overlayClassName,
      )}
      onClick={() => closeOnOverlayClick && onClose?.()}
    >
      <div
        className={clsx(
          "bg-white rounded-lg shadow-lg w-full max-w-lg",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
