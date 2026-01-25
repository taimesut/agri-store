import clsx from "clsx";

export function DialogFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("flex justify-end gap-2 p-4 border-t", className)}>
      {children}
    </div>
  );
}
