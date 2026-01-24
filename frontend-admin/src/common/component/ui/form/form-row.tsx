import clsx from "clsx";
import type { FormRowProps } from "./form.interface";

export function FormRow({ columns = 2, children }: FormRowProps) {
  return (
    <div
      className={clsx(
        "grid gap-4",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-3",
        columns === 4 && "grid-cols-4",
      )}
    >
      {children}
    </div>
  );
}
