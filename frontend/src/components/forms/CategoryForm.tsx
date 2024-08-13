import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";
import { CategoryEdit } from "../../models/category";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import FormError from "../ui/FormError";
import { ButtonLoading } from "../ui/ButtonLoading";

type CategoryFormProps = {
  defaultValues?: CategoryEdit;
  onSubmit: (values: CategoryEdit) => Promise<void>;
};

const categoryEditScheme = object({
  title: string().min(1, "Title is required"),
  description: string().min(1, "Description is required"),
});

const CategoryForm: FC<CategoryFormProps> = (props) => {
  const { defaultValues, onSubmit } = props;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CategoryEdit>({
    defaultValues,
    resolver: zodResolver(categoryEditScheme),
  });

  const submitHandler: SubmitHandler<CategoryEdit> = async (values) => {
    try {
      await onSubmit(values);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
      <section className="grid gap-4 items-start">
        <div className="grid items-center gap-2">
          <Label>Title</Label>
          <Input {...register("title")} />
          <FormError>{errors.title?.message}</FormError>
        </div>
        <div className="grid items-center gap-2">
          <Label>Description</Label>
          <Textarea {...register("description")} />
          <FormError>{errors.description?.message}</FormError>
        </div>
      </section>
      <section className="grow flex justify-end items-end">
        {!isSubmitting ? (
          <Button type="submit">Save changes</Button>
        ) : (
          <ButtonLoading />
        )}
      </section>
    </form>
  );
};

export default CategoryForm;
