// forms/login.form.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginFormValues,
} from "@/form/login/login.schema";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthStore } from "@/store/auth/auth.store";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormItem, FormRow, Input } from "@/component/ui";
import { AuthApi } from "@/api/auth/auth.api";

export function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
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
