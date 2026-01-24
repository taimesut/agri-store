import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import type { SearchParams } from "@/common/interface";
import axios from "axios";
import { Button, Form, FormItem, FormRow, Input } from "@/common/component/ui";
import { UserMutationCreate } from "../query";
import { UserCreateShema, type UserCreateInput } from "../schema";

interface Props {
  params: SearchParams;
}

export function UserFormCreate({ params }: Props) {
  const mutationCreate = UserMutationCreate({ params });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserCreateInput>({
    resolver: zodResolver(UserCreateShema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  function onSubmit(values: UserCreateInput) {
    mutationCreate.mutate(
      { payload: values },
      {
        onSuccess: () => {
          toast.success("Tạo mới thành công");
          reset();
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message ?? "Xảy ra lỗi");
          } else {
            toast.error("Xảy ra lỗi không xác định");
          }
        },
      },
    );
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
      <FormRow columns={1}>
        <FormItem label="Họ và Tên" required error={errors.password?.message}>
          <Input
            type="text"
            placeholder="Nguyễn Văn A"
            {...register("fullName")}
            error={!!errors.password}
          />
        </FormItem>
      </FormRow>
      <FormRow columns={1}>
        <FormItem label="SĐT" error={errors.phone?.message}>
          <Input
            type="text"
            placeholder="098xxxxxxx"
            {...register("phone")}
            error={!!errors.phone}
          />
        </FormItem>
      </FormRow>

      <Button type="submit" className="w-full" loading={isSubmitting}>
        Tạo mới
      </Button>
    </Form>
  );
}
