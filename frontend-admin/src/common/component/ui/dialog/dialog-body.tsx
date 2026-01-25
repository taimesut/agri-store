import clsx from "clsx";

export function DialogBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx("p-4", className)}>{children}</div>;
}
