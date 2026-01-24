import { queryClient } from "@/common/config/query-client";
import type { SearchParams } from "@/common/interface";
import { Button, Form, FormItem, FormRow, Input } from "@/common/component/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TagMutationUpdate, TagQueryDetail } from "../query";
import { TagUpdateShema, type TagUpdateInput } from "../schema";
import { TagQueryKey } from "../query";

interface Props {
  id: string;
  params: SearchParams;
}

export function TagFormUpdate({ id, params }: Props) {
  const mutationUpdate = TagMutationUpdate({ params });

  const queryUserDetail = TagQueryDetail({ id });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TagUpdateInput>({
    resolver: zodResolver(TagUpdateShema),
    defaultValues: {
      name: queryUserDetail.data?.tag.name,
    },
  });

  useEffect(() => {
    if (queryUserDetail.data?.tag) {
      reset({
        name: queryUserDetail.data?.tag.name,
      });
    }
  }, [queryUserDetail.data, reset]);

  function onSubmit(values: TagUpdateInput) {
    mutationUpdate.mutate(
      { id, payload: values },
      {
        onSuccess: () => {
          toast.success("Cập nhật user thành công");
          queryClient.invalidateQueries({
            queryKey: TagQueryKey.detail(id),
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
        <FormItem label="Name" required error={errors.name?.message}>
          <Input
            type="text"
            placeholder="Nguyễn Văn A"
            {...register("name")}
            error={!!errors.name}
          />
        </FormItem>
      </FormRow>

      <Button type="submit" className="w-full" loading={isSubmitting}>
        Cập nhật
      </Button>
    </Form>
  );
}
