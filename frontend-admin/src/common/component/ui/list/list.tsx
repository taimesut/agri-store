import type { ReactNode } from "react";
import clsx from "clsx";

interface ListProps {
  children: ReactNode;
  className?: string;
}

export function List({ children, className }: ListProps) {
  return <ul className={clsx("list-none p-0 m-0", className)}>{children}</ul>;
}
