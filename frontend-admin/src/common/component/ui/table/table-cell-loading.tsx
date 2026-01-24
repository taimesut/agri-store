export function TableCellLoading({ colSpan }: { colSpan: number }) {
  return (
    <td colSpan={colSpan} className="py-6 text-center text-gray-500">
      Đang tải dữ liệu
    </td>
  );
}
