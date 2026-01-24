export interface ComboBoxOption<T = string> {
  label: string;
  value: T;
}

export interface ComboBoxProps<T = string> {
  options: ComboBoxOption<T>[];

  value?: T;
  defaultValue?: T;

  onChange?: (value: T | undefined) => void;

  placeholder?: string;
  disabled?: boolean;

  searchable?: boolean;
  className?: string;
}
