import { queryClient } from "@/common/config/query-client";
import type { SearchParams } from "@/common/interface";
import {
  Button,
  Form,
  FormItem,
  FormRow,
  Input,
  Spinner,
} from "@/common/component/ui";
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

  const queryDetail = UserQueryDetail({ id });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserUpdateInput>({
    resolver: zodResolver(UserUpdateShema),
    defaultValues: {
      fullName: queryDetail.data?.user.fullName,
    },
  });

  useEffect(() => {
    if (queryDetail.data?.user) {
      reset({
        fullName: queryDetail.data?.user.fullName,
      });
    }
  }, [queryDetail.data, reset]);

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

  if (!queryDetail.isSuccess) {
    return <Spinner />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow columns={1}>
        <FormItem label="Email">
          <Input
            type="text"
            placeholder={queryDetail.data?.user.email}
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
        <FormItem label="Họ và Tên" error={errors.fullName?.message}>
          <Input
            type="text"
            placeholder="Nguyễn Văn A"
            {...register("fullName")}
            error={!!errors.fullName}
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
        Cập nhật
      </Button>
    </Form>
  );
}
