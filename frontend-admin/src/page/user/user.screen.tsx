import type React from "react";
import { USER_PAGE_TITLE } from "./user.constant";
import { UserList } from "./user-list";
import type { PaginationQuery } from "@/common/interface";

const UserScreen: React.FC = () => {
  const query: PaginationQuery = {
    limit: 1,
    order: "desc",
    orderBy: "createdAt",
    page: 1,
  };
  return (
    <>
      <div className="login-screen border-2 p-8 rounded-2xl bg-amber-200 min-w-md">
        <h1 className="text-3xl text-center">{USER_PAGE_TITLE}</h1>
        <UserList query={query} />
      </div>
    </>
  );
};

export default UserScreen;
