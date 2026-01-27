import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Button,
  ComboBox,
  Form,
  FormItem,
  FormRow,
  Input,
} from "@/common/component/ui";
import { CategoryMutationCreate, CategoryQueryList } from "../query";
import { CategoryCreateShema, type CategoryCreateInput } from "../schema";
import { useState } from "react";
import { FIND_ALL_PARAMS } from "../page/constant";
import { slugify } from "@/common/util";

export function CategoryFormCreate() {
  const mutationCreate = CategoryMutationCreate();
  const [parentId, setParentId] = useState<string>();

  const queryList = CategoryQueryList({
    params: FIND_ALL_PARAMS,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryCreateInput>({
    resolver: zodResolver(CategoryCreateShema),
  });

  function onSubmit(values: CategoryCreateInput) {
    mutationCreate.mutate(
      {
        payload: {
          ...values,
          ...(values.handle !== null &&
            values.handle !== undefined && { handle: slugify(values.handle) }),
          ...(parentId !== null && parentId !== undefined && { parentId }),
        },
      },
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

  if (!queryList.isSuccess) {
    return <div>Đang tải dữ liệu</div>;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <FormRow columns={1}>
        <FormItem label="Name" required error={errors.name?.message}>
          <Input
            type="text"
            placeholder="Name"
            {...register("name")}
            error={!!errors.name}
          />
        </FormItem>
      </FormRow>

      <FormRow columns={1}>
        <FormItem label="Handle" required error={errors.handle?.message}>
          <Input
            type="text"
            placeholder="Handle"
            {...register("handle")}
            error={!!errors.handle}
          />
        </FormItem>
      </FormRow>

      <FormRow columns={1}>
        <FormItem label="Parent" required error={errors.parentId?.message}>
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

      <div className="w-full flex justify-center">
        <Button type="submit" className="w-fit" loading={isSubmitting}>
          Tạo mới
        </Button>
      </div>
    </Form>
  );
}
