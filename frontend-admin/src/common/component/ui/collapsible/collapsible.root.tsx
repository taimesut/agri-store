import { useState } from "react";
import { CollapsibleContext } from "./collapsible.context";
import type { CollapsibleProps } from "./collapsible.type";

export function Collapsible({
  open,
  defaultOpen = false,
  disabled,
  onOpenChange,
  children,
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;

  const toggle = () => {
    if (disabled) return;
    const next = !currentOpen;

    if (!isControlled) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  return (
    <CollapsibleContext.Provider
      value={{
        open: currentOpen,
        toggle,
        disabled,
      }}
    >
      {children}
    </CollapsibleContext.Provider>
  );
}
