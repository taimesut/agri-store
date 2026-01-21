export function TableEmpty({ colSpan }: { colSpan: number }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="py-6 text-center text-gray-500"
      >
        Không có dữ liệu
      </td>
    </tr>
  );
}
