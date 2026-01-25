import type { ReactNode } from "react";
import clsx from "clsx";

interface ListItemProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ListItem({
  children,
  className,
  onClick,
}: ListItemProps) {
  return (
    <li
      onClick={onClick}
      className={clsx(
        "px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100",
        className,
      )}
    >
      {children}
    </li>
  );
}
