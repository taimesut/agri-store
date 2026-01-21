import type { BaseProps } from "./table.interface";

export function TableBody({ children }: BaseProps) {
  return <tbody className="divide-y">{children}</tbody>;
}
