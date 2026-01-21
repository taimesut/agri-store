import type { ReactNode } from "react";

export interface FormItemProps {
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
  required?: boolean;
  children: ReactNode;
}

export interface FormRowProps {
  columns?: 1 | 2 | 3 | 4;
  children: ReactNode;
}