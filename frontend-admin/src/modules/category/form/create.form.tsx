import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import type { SearchParams } from "@/common/interface";
import axios from "axios";
import {
  Button,
  ComboBox,
  Form,
  FormItem,
  FormRow,
  Input,
  Spinner,
} from "@/common/component/ui";
import { CategoryMutationCreate, CategoryQueryList } from "../query";
import { CategoryCreateShema, type CategoryCreateInput } from "../schema";

interface Props {
  params: SearchParams;
}

export function UserFormCreate({ params }: Props) {
  const mutationCreate = CategoryMutationCreate({ params });
  const queryList = CategoryQueryList({ params });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryCreateInput>({
    resolver: zodResolver(CategoryCreateShema),
    defaultValues: {
      handle: "",
      name: "",
      parentId: "",
    },
  });

  function onSubmit(values: CategoryCreateInput) {
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

  if (!queryList.isSuccess) {
    return <Spinner />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow columns={1}>
        <FormItem label="Name" required error={errors.name?.message}>
          <Input
            type="text"
            placeholder="Áo thun"
            {...register("name")}
            error={!!errors.name}
          />
        </FormItem>
      </FormRow>
      <FormRow columns={1}>
        <FormItem label="Handle" required error={errors.handle?.message}>
          <Input
            type="text"
            placeholder="ao-thun"
            {...register("name")}
            error={!!errors.handle}
          />
        </FormItem>
      </FormRow>
      <FormRow columns={1}>
        <FormItem label="Parent" required error={errors.parentId?.message}>
          <ComboBox
            options={queryList.data.categories.map((e) => ({
              label: e.name,
              value: e.id,
            }))}
          />
        </FormItem>
      </FormRow>

      <Button type="submit" className="w-full" loading={isSubmitting}>
        Tạo mới
      </Button>
    </Form>
  );
}
