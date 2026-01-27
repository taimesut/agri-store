
import { createContext, useContext } from "react";
import type { CollapsibleContextValue } from "./collapsible.type";

export const CollapsibleContext =
  createContext<CollapsibleContextValue | null>(null);

export function useCollapsibleContext() {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) {
    throw new Error("Collapsible components must be used inside <Collapsible>");
  }
  return ctx;
}