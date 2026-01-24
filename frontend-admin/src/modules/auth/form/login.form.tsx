// forms/login.form.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormItem, FormRow, Input } from "@/common/component/ui";
import { useAuthStore } from "@/common/store";
import { AuthLoginSchema, type LoginInput } from "../schema";
import { AuthApi } from "../api";

export function AuthLoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(AuthLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginInput) {
    try {
      await AuthApi.login(values);
      toast.success("Đăng nhập thành công");
      const user = (await AuthApi.me()).data;

      useAuthStore.getState().setAuth(user);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Xảy ra lỗi");
      } else {
        toast.error("Xảy ra lỗi không xác định");
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow columns={1}>
        <FormItem label="Email" required error={errors.email?.message}>
          <Input
            type="email"
            placeholder="email@example.com"
            {...register("email")}
            error={!!errors.email}
          />
        </FormItem>
      </FormRow>
      <FormRow columns={1}>
        <FormItem label="Mật khẩu" required error={errors.password?.message}>
          <Input
            type="password"
            placeholder="••••••••"
            {...register("password")}
            error={!!errors.password}
          />
        </FormItem>
      </FormRow>

      <Button type="submit" className="w-full" loading={isSubmitting}>
        Đăng nhập
      </Button>
    </Form>
  );
}
