import { queryClient } from "@/common/config/query-client";
import type { SearchParams } from "@/common/interface";
import { Button, Form, FormItem, FormRow, Input } from "@/common/component/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UserMutationUpdate, UserQueryDetail } from "../query";
import { UserUpdateShema, type UserUpdateInput } from "../schema";
import { UserQueryKey } from "../query";

interface Props {
  id: string;
  params: SearchParams;
}

export function UserFormUpdate({ id, params }: Props) {
  const mutationUpdate = UserMutationUpdate({ params });

  const queryUserDetail = UserQueryDetail({ id });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserUpdateInput>({
    resolver: zodResolver(UserUpdateShema),
    defaultValues: {
      fullName: queryUserDetail.data?.user.fullName,
    },
  });

  useEffect(() => {
    if (queryUserDetail.data?.user) {
      reset({
        fullName: queryUserDetail.data?.user.fullName,
      });
    }
  }, [queryUserDetail.data, reset]);

  function onSubmit(values: UserUpdateInput) {
    mutationUpdate.mutate(
      { userId: id, payload: values },
      {
        onSuccess: () => {
          toast.success("Cập nhật user thành công");
          queryClient.invalidateQueries({
            queryKey: UserQueryKey.detail(id),
          });
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
        <FormItem label="Email" error={errors.password?.message}>
          <Input
            type="text"
            placeholder={queryUserDetail.data?.user.email}
            disabled={true}
          />
        </FormItem>
      </FormRow>
      <FormRow columns={1}>
        <FormItem label="Mật khẩu" error={errors.password?.message}>
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
        Cập nhật
      </Button>
    </Form>
  );
}
