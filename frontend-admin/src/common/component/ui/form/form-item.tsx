import type { FormItemProps } from "./form.interface";

export function FormItem({
  label,
  error,
  hint,
  required,
  children,
}: FormItemProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      {children}

      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
