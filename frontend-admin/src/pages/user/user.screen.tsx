import type React from "react";
import { USER_PAGE_TITLE } from "./user.constant";

const UserScreen: React.FC = () => {
  return (
    <>
      <div className="login-screen border-2 p-8 rounded-2xl bg-amber-200 min-w-md">
        <h1 className="text-3xl text-center">{USER_PAGE_TITLE}</h1>
      </div>
    </>
  );
};

export default UserScreen;
