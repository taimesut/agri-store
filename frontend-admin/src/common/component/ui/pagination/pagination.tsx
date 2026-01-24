import clsx from "clsx";
import type { PaginationProps } from "./pagination.interface";

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({
  page,
  total,
  limit,
  onChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const totalPage = Math.ceil(total / limit);
  if (totalPage <= 1) return null;

  const startPage = Math.max(1, page - siblingCount);
  const endPage = Math.min(totalPage, page + siblingCount);

  const pages = range(startPage, endPage);

  return (
    <div className={clsx("flex items-center gap-1", className)}>
      {/* First */}
      <PageButton disabled={page === 1} onClick={() => onChange(1)}>
        «
      </PageButton>

      {/* Prev */}
      <PageButton disabled={page === 1} onClick={() => onChange(page - 1)}>
        ‹
      </PageButton>

      {/* Start ellipsis */}
      {startPage > 1 && (
        <>
          <PageButton onClick={() => onChange(1)}>1</PageButton>
          {startPage > 2 && <span className="px-2">…</span>}
        </>
      )}

      {/* Pages */}
      {pages.map((p) => (
        <PageButton key={p} active={p === page} onClick={() => onChange(p)}>
          {p}
        </PageButton>
      ))}

      {/* End ellipsis */}
      {endPage < totalPage && (
        <>
          {endPage < totalPage - 1 && <span className="px-2">…</span>}
          <PageButton onClick={() => onChange(totalPage)}>
            {totalPage}
          </PageButton>
        </>
      )}

      {/* Next */}
      <PageButton
        disabled={page === totalPage}
        onClick={() => onChange(page + 1)}
      >
        ›
      </PageButton>

      {/* Last */}
      <PageButton
        disabled={page === totalPage}
        onClick={() => onChange(totalPage)}
      >
        »
      </PageButton>
    </div>
  );
}

function PageButton({
  children,
  active,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "min-w-8 rounded-md px-2 py-1 text-sm",
        "border transition",
        disabled && "cursor-not-allowed opacity-50",
        active ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-100",
      )}
    >
      {children}
    </button>
  );
}
