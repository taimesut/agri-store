import { useEffect, useRef, useState } from "react";
import type { ComboBoxOption, ComboBoxProps } from "./combobox.interface";
import clsx from "clsx";

export function ComboBox<T>({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Chọn...",
  disabled = false,
  searchable = true,
  className,
}: ComboBoxProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [internalValue, setInternalValue] = useState<T | undefined>(
    defaultValue,
  );

  const ref = useRef<HTMLDivElement>(null);

  const selectedValue = value ?? internalValue;

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase()),
      )
    : options;

  // close when click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectOption(option: ComboBoxOption<T>) {
    onChange?.(option.value);
    setInternalValue(option.value);
    setOpen(false);
    setSearch("");
  }

  return (
    <div ref={ref} className={clsx("relative w-full", className)}>
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm disabled:opacity-50"
      >
        <span>
          {selectedOption?.label ?? (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>
        <span className="ml-2">▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow">
          {searchable && (
            <input
              type="text"
              className="w-full border-b px-3 py-2 text-sm outline-none"
              placeholder="Tìm kiếm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}

          <ul className="max-h-60 overflow-auto">
            {filteredOptions.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500">
                Không có dữ liệu
              </li>
            )}

            {filteredOptions.map((opt) => (
              <li
                key={String(opt.value)}
                onClick={() => selectOption(opt)}
                className={clsx(
                  "cursor-pointer px-3 py-2 text-sm hover:bg-gray-100",
                  opt.value === selectedValue && "bg-gray-100 font-medium",
                )}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
