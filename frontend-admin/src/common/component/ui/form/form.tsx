import type { FormHTMLAttributes } from "react";

export function Form({
  className,
  ...props
}: FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form
      {...props}
      noValidate
      className={`space-y-4 ${className ?? ""}`}
    />
  );
}
