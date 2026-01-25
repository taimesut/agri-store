import type { BaseProps } from "./table.type";

export function TableBody({ children }: BaseProps) {
  return <tbody className="divide-y">{children}</tbody>;
}
