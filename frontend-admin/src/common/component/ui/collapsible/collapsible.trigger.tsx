import type { ReactNode } from "react";
import { useCollapsibleContext } from "./collapsible.context";

interface Props {
  children: ReactNode;
}

export function CollapsibleTrigger({ children }: Props) {
  const { toggle, disabled } = useCollapsibleContext();

  return (
    <div
      role="button"
      aria-disabled={disabled}
      onClick={toggle}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
}