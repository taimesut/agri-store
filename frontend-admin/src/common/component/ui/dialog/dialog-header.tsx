import clsx from "clsx";

export function DialogHeader({
  title,
  onClose,
  className,
}: {
  title?: string;
  onClose?: () => void;
  className?: string;
}) {
  return (
    <div className={clsx("flex items-center justify-between p-4 border-b", className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      {onClose && (
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          ✕
        </button>
      )}
    </div>
  );
}
