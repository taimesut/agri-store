import { LoginForm } from "../form";

export default function AuthLoginPageRender() {
  return (
    <>
      <div className="login-screen border-2 p-8 rounded-2xl min-w-md">
        <h1 className="text-3xl text-center">Đăng nhập</h1>
        <LoginForm />
      </div>
    </>
  );
}
