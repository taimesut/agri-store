import { forwardRef, type InputHTMLAttributes } from "react";
import clsx from "clsx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={clsx(
          "w-full rounded-lg border px-3 py-2 text-sm outline-none transition",
          "focus:ring-2 focus:ring-offset-1",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500",
          className,
        )}
      />
    );
  },
);

Input.displayName = "Input";
