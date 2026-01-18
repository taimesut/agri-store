import { useForm } from "react-hook-form";
import { LOGIN_PAGE_TITLE } from "./login.constant";
import type { LoginFormValues } from "./login.interfaces";
import { LoginForm } from "./parts/login-form/login-form";
import { LoginFooter } from "./parts/login-footer/login-footer";
import type React from "react";

const LoginScreen: React.FC = () => {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (values: LoginFormValues) => {
    console.log("login submit:", values);
    // authApi.login(values)
  };

  return (
    <>
      <h1>{LOGIN_PAGE_TITLE}</h1>

      <LoginForm form={form} onSubmit={handleLogin} />
      <LoginFooter />
    </>
  );
};

export default LoginScreen;

