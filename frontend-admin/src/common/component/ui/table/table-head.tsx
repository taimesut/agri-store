import type { BaseProps } from "./table.interface";

export function TableHead({ children }: BaseProps) {
  return (
    <thead className="bg-gray-50 text-left text-gray-600">
      {children}
    </thead>
  );
}
