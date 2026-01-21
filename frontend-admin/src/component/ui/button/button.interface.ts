import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonSize, ButtonVariant } from "./button.type";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}