import { queryClient } from "@/common/config/query-client";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  CategoryMutationUpdate,
  CategoryQueryDetail,
  CategoryQueryList,
} from "../query";
import { CategoryUpdateShema, type CategoryUpdateInput } from "../schema";
import { CategoryQueryKey } from "../query";
import { FIND_ALL_PARAMS } from "../page/constant";
import { slugify } from "@/common/util";

interface Props {
  id: string;
}

export function CategoryFormUpdate({ id }: Props) {
  const mutationUpdate = CategoryMutationUpdate();

  const queryDetail = CategoryQueryDetail({ id });
  const queryList = CategoryQueryList({
    params: FIND_ALL_PARAMS,
  });

  const [parentId, setParentId] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryUpdateInput>({
    resolver: zodResolver(CategoryUpdateShema),
    defaultValues: {
      handle: queryDetail.data?.category.handle,
      name: queryDetail.data?.category.name,
    },
  });

  useEffect(() => {
    if (queryDetail.data?.category) {
      reset({
        handle: queryDetail.data?.category.handle,
        name: queryDetail.data?.category.name,
        ...(queryDetail.data?.category.parentId !== null &&
          queryDetail.data?.category.parentId !== undefined && {
            parentId: queryDetail.data?.category.parentId,
          }),
      });
      setParentId(queryDetail.data?.category.parentId ?? undefined);
    }
  }, [queryDetail.data, reset]);

  function onSubmit(values: CategoryUpdateInput) {
    mutationUpdate.mutate(
      {
        userId: id,
        payload: {
          ...values,
          ...(values.handle !== null &&
            values.handle !== undefined && { handle: slugify(values.handle) }),
          ...(parentId !== null && parentId !== undefined && { parentId }),
        },
      },
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
    <Form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <FormRow columns={1}>
        <FormItem label="Name" error={errors.name?.message}>
          <Input
            type="name"
            placeholder="name"
            {...register("name")}
            error={!!errors.name}
          />
        </FormItem>
      </FormRow>
      <FormRow columns={1}>
        <FormItem label="handle" error={errors.handle?.message}>
          <Input
            type="text"
            placeholder="Nguyễn Văn A"
            {...register("handle")}
            error={!!errors.handle}
          />
        </FormItem>
      </FormRow>
      <FormRow columns={1}>
        <FormItem label="Parent" error={errors.parentId?.message}>
          <ComboBox
            options={queryList.data?.categories.map((e) => ({
              label: e.name,
              value: e.id,
            }))}
            value={parentId}
            onChange={(v) => setParentId(v)}
          />
        </FormItem>
      </FormRow>

      <Button type="submit" className="w-full" loading={isSubmitting}>
        Cập nhật
      </Button>
    </Form>
  );
}
