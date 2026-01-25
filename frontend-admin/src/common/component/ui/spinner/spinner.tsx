import clsx from "clsx";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  className?: string;
}

const SIZE_MAP = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-4",
};

export function Spinner({
  size = "md",
  color = "border-blue-600",
  className,
}: SpinnerProps) {
  return (
    <span
      className={clsx(
        "inline-block animate-spin rounded-full",
        "border-t-transparent",
        SIZE_MAP[size],
        color,
        className,
      )}
    />
  );
}
