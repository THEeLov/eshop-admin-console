import { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, object, string } from "zod";
import { ProductEdit } from "../../models/product";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import FormError from "../ui/FormError";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCategoriesBasic } from "../../hooks/useCategories";
import { ButtonLoading } from "../ui/ButtonLoading";

type ProductFormProps = {
  defaultValues?: ProductEdit;
  onSubmit: (values: ProductEdit) => Promise<void>;
};

const productEditScheme = object({
  title: string().min(1, "Title is required"),
  description: string().min(1, "Description is required"),
  price: number().min(0, "Price should be more than 0"),
  categoryId: string().optional(),
});

const ProductForm: FC<ProductFormProps> = (props) => {
  const { defaultValues, onSubmit } = props;

  const { data: categories } = useCategoriesBasic();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductEdit>({
    defaultValues,
    resolver: zodResolver(productEditScheme),
  });

  const submitHandler: SubmitHandler<ProductEdit> = async (values) => {
    try {
      await onSubmit(values);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
      <section className="grid grid-cols-2 gap-4 items-start">
        <div className="col-span-full grid items-center gap-2">
          <Label>Title</Label>
          <Input {...register("title")} />
          <FormError>{errors.title?.message}</FormError>
        </div>
        <div className="mb-4 grid items-center gap-2">
          <Label>Price</Label>
          <Input
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          <FormError>{errors.price?.message}</FormError>
        </div>
        <div className="mb-4 grid items-center gap-2">
          <Label>Category</Label>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? undefined}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"null"}>
                    No Category
                  </SelectItem>
                  {categories?.items.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  )) || []}
                </SelectContent>
              </Select>
            )}
          />
          <FormError>{errors.categoryId?.message}</FormError>
        </div>
        <div className="col-span-full grid items-center gap-2">
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

export default ProductForm;
