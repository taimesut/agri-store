import type { ReactNode } from "react";
import clsx from "clsx";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export interface CardSectionProps {
  children: ReactNode;
  className?: string;
}

function CardRoot({ children, className }: CardProps) {
  return (
    <div className={clsx("rounded-lg border bg-white shadow-sm", className)}>
      {children}
    </div>
  );
}

function CardHeader({ children, className }: CardSectionProps) {
  return (
    <div className={clsx("border-b px-4 py-3 font-medium", className)}>
      {children}
    </div>
  );
}

function CardBody({ children, className }: CardSectionProps) {
  return <div className={clsx("px-4 py-3", className)}>{children}</div>;
}

function CardFooter({ children, className }: CardSectionProps) {
  return (
    <div
      className={clsx("border-t px-4 py-3 text-sm text-gray-600", className)}
    >
      {children}
    </div>
  );
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
