import type { ReactNode } from "react";
import { useCollapsibleContext } from "./collapsible.context";

interface Props {
  children: ReactNode;
}

export function CollapsibleContent({ children }: Props) {
  const { open } = useCollapsibleContext();

  if (!open) return null;

  return <div>{children}</div>;
}
