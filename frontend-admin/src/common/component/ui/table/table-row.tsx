import clsx from "clsx";
import type { BaseProps } from "./table.type";

import type { ComponentPropsWithoutRef } from "react";

type TableRowProps = ComponentPropsWithoutRef<"tr"> & BaseProps;

export function TableRow({
  children,
  className,
  onClick,
  ...rest
}: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={clsx(
        "hover:bg-gray-50 transition",
        onClick && "cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </tr>
  );
}
