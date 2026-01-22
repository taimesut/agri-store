import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/component/ui";
import type { UserPageState } from "../types/user-state.type";
import { useQueryUserList } from "@/query/user/user.queries";

interface Props {
  state: Extract<UserPageState, { view: "LIST" }>;
  setState: React.Dispatch<React.SetStateAction<UserPageState>>;
}

export default function UserListPart({ setState, state }: Props) {
  const { params } = state;
  const queryUser = useQueryUserList({ params });
  return (
    <>
      <h2 className="text-center text-3xl">Danh sách User</h2>

      <Button className="mb-4"
        onClick={() => {
          setState({
            view: "CREATE",
            params,
          });
        }}
      >
        Tạo người dùng
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell header={true}> </TableCell>
            <TableCell header={true}>Email</TableCell>
            <TableCell header={true}>Full Name</TableCell>
            <TableCell header={true}>Phone</TableCell>
            <TableCell header={true}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {queryUser.data?.users.map((e) => (
            <TableRow key={e.id}>
              <TableCell> </TableCell>
              <TableCell>{e.email}</TableCell>
              <TableCell>{e.fullName}</TableCell>
              <TableCell>{e.phone}</TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      setState({
                        view: "UPDATE",
                        id: e.id,
                        params,
                      });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      setState({
                        view: "DELETE",
                        id: e.id,
                        params,
                      });
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <button
        onClick={() =>
          setState({
            view: "UPDATE",
            id: "123",
          })
        }
      >
        Edit #123
      </button> */}
    </>
  );
}
