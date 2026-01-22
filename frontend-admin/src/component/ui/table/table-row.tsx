import clsx from "clsx";
import type { BaseProps } from "./table.interface";

export function TableRow({ children, className }: BaseProps) {
  return (
    <tr
      className={clsx(
        "hover:bg-gray-50 transition",
        className
      )}
    >
      {children}
    </tr>
  );
}
