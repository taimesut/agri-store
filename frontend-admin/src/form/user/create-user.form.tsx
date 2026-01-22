import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useMutationUserCreate } from "@/query/user";
import type { SearchParams } from "@/common/interface";
import axios from "axios";
import {
  CreateUserShema,
  type CreateUserInput,
} from "@/schema/user/create-user.schema";
import { Button, Form, FormItem, FormRow, Input } from "@/component/ui";

interface Props {
  params: SearchParams;
}

export function CreateUserForm({ params }: Props) {
  const mutationCreate = useMutationUserCreate({ params });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserInput>({
    resolver: zodResolver(CreateUserShema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutationCreate.mutate(
      { payload: values },
      {
        onSuccess: () => {
          toast.success("Tạo user thành công");
          reset();
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message ?? "Xảy ra lỗi");
          } else {
            toast.error("Xảy ra lỗi không xác định");
          }
          console.log(error);
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

      <Button type="submit" className="w-full" loading={isSubmitting}>
        Tạo User
      </Button>
    </Form>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input {...register("email")} />
    //   <input {...register("password")} />
    //   <input {...register("fullName")} />
    //   <input {...register("phone")} />

    //   <button disabled={mutationCreate.isPending}>Tạo user</button>
    // </form>
  );
}
