import type { ReactNode } from "react";

export interface CollapsibleProps {
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
  disabled?: boolean;
}