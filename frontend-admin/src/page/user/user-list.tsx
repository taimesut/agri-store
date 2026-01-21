import { useQuery } from "@tanstack/react-query";
import type { UserListProps } from "./user.interface";
import { userQueryKeys } from "@/query/key";
import { UserApi } from "@/api/user/user.api";
import {
  Table,
  TableBody,
  TableCell,
  TableCellEmpty,
  TableHead,
  TableRow,
} from "@/component/ui";
import { TableCellLoading } from "@/component/ui/table/table-cell-loading";

export function UserList({ query }: UserListProps) {
  const { data, isLoading } = useQuery({
    queryKey: userQueryKeys.list(query),

    queryFn: ({ queryKey }) => {
      const [, query] = queryKey;
      return UserApi.findAll(query);
    },

    select: (res) => res.data,
  });

  if (isLoading) {
    return (
      <Table>
        <TableRow>
          <TableCellLoading colSpan={1} />
        </TableRow>
      </Table>
    );
  }

  if (!data || data.users.length === 0) {
    return (
      <Table>
        <TableRow>
          <TableCellEmpty colSpan={1} />
        </TableRow>
      </Table>
    );
  }
  return (
    <Table>
      <TableHead>
        {Object.keys(data?.users[0]).map((col) => (
          <TableCell header={true}>{col}</TableCell>
        ))}
      </TableHead>
      <TableBody>
        {data?.users.map((r) => (
          <TableRow key={r.id}>
            <TableCell key={r.id}>{r.id}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
