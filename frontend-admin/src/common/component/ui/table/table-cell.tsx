import clsx from "clsx";
import type { BaseProps } from "./table.type";

export interface TableCellProps extends BaseProps {
  header?: boolean;
}

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
        className,
      )}
    >
      {children}
    </Component>
  );
}
