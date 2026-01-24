import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import type { SearchParams } from "@/common/interface";
import axios from "axios";
import { Button, Form, FormItem, FormRow, Input } from "@/common/component/ui";
import { TagMutationCreate } from "../query";
import { TagCreateShema, type TagCreateInput } from "../schema";

interface Props {
  params: SearchParams;
}

export function UserFormCreate({ params }: Props) {
  const mutationCreate = TagMutationCreate({ params });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TagCreateInput>({
    resolver: zodResolver(TagCreateShema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: TagCreateInput) {
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
        <FormItem label="Tên" required error={errors.name?.message}>
          <Input
            type="text"
            placeholder="new"
            {...register("name")}
            error={!!errors.name}
          />
        </FormItem>
      </FormRow>

      <Button type="submit" className="w-full" loading={isSubmitting}>
        Tạo mới
      </Button>
    </Form>
  );
}
