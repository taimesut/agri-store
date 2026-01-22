import { AuthLoginForm } from "@/form";
import { LOGIN_PAGE_TITLE } from "./login.constant";
import type React from "react";

const LoginScreen: React.FC = () => {
  
  return (
    <>
      <div className="login-screen border-2 p-8 rounded-2xl bg-amber-200 min-w-md">
        <h1 className="text-3xl text-center">{LOGIN_PAGE_TITLE}</h1>
        <AuthLoginForm/>
      </div>
    </>
  );
};

export default LoginScreen;
