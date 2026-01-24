import clsx from "clsx";
import type { TableCellProps } from "./table.interface";

export function TableCell({
  children,
  header = false,
  className,
}: TableCellProps) {
  const Component = header ? "th" : "td";

  return (
    <Component
      className={clsx(
        "px-4 py-3",
        header && "font-medium text-gray-700",
        className
      )}
    >
      {children}
    </Component>
  );
}
