import clsx from "clsx";
import type { BaseProps } from "./table.type";

export function Table({ children, className }: BaseProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table
        className={clsx(
          "w-full border-collapse text-sm",
          className
        )}
      >
        {children}
      </table>
    </div>
  );
}
