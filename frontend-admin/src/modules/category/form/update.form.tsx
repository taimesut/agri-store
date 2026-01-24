import { queryClient } from "@/common/config/query-client";
import type { SearchParams } from "@/common/interface";
import {
  Button,
  ComboBox,
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
import {
  CategoryMutationUpdate,
  CategoryQueryDetail,
  CategoryQueryList,
} from "../query";
import { CategoryUpdateShema, type CategoryUpdateInput } from "../schema";
import { CategoryQueryKey } from "../query";

interface Props {
  id: string;
  params: SearchParams;
}

export function UserFormUpdate({ id, params }: Props) {
  const mutationUpdate = CategoryMutationUpdate({ params });

  const queryDetail = CategoryQueryDetail({ id });
  const queryList = CategoryQueryList({ params });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryUpdateInput>({
    resolver: zodResolver(CategoryUpdateShema),
    defaultValues: {
      ...queryDetail.data?.category,
    },
  });

  useEffect(() => {
    if (queryDetail.data?.category) {
      reset({
        ...queryDetail.data?.category,
      });
    }
  }, [queryDetail.data, reset]);

  function onSubmit(values: CategoryUpdateInput) {
    mutationUpdate.mutate(
      { userId: id, payload: values },
      {
        onSuccess: () => {
          toast.success("Cập nhật thành công");
          queryClient.invalidateQueries({
            queryKey: CategoryQueryKey.detail(id),
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

  if (!queryList.isSuccess) {
    return <Spinner />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow columns={1}>
        <FormItem label="Name" error={errors.name?.message}>
          <Input
            type="text"
            placeholder="Áo thun"
            {...register("name")}
            error={!!errors.name}
          />
        </FormItem>
      </FormRow>
      <FormRow columns={1}>
        <FormItem label="Handle" error={errors.handle?.message}>
          <Input
            type="text"
            placeholder="ao-thun"
            {...register("name")}
            error={!!errors.handle}
          />
        </FormItem>
      </FormRow>
      <FormRow columns={1}>
        <FormItem label="Parent" error={errors.parentId?.message}>
          <ComboBox
            options={queryList.data.categories.map((e) => ({
              label: e.name,
              value: e.id,
            }))}
          />
          <Input
            type="text"
            placeholder="Áo thun"
            {...register("parentId")}
            error={!!errors.parentId}
          />
        </FormItem>
      </FormRow>

      <Button type="submit" className="w-full" loading={isSubmitting}>
        Cập nhật
      </Button>
    </Form>
  );
}
