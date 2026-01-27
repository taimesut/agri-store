import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Form, FormItem, FormRow, Input } from "@/common/component/ui";
import { TagMutationCreate } from "../query";
import { TagCreateShema, type TagCreateInput } from "../schema";

export function TagFormCreate() {
  const mutationCreate = TagMutationCreate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TagCreateInput>({
    resolver: zodResolver(TagCreateShema),
  });

  function onSubmit(values: TagCreateInput) {
    console.log(values);
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
    <Form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <FormRow columns={1}>
        <FormItem label="Name" required error={errors.name?.message}>
          <Input
            type="text"
            placeholder="hàng mới"
            {...register("name")}
            error={!!errors.name}
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
