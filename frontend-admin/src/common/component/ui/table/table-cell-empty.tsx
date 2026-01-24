export function TableCellEmpty({ colSpan }: { colSpan: number }) {
  return (
    <td colSpan={colSpan} className="py-6 text-center text-gray-500">
      Không có dữ liệu
    </td>
  );
}
