import { FC, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useCategory, useCategoryEdit } from "../../hooks/useCategories";
import { CategoryEdit } from "../../models/category";
import CategoryForm from "../forms/CategoryForm";
import { ToastParams, useToast } from "../ui/use-toast";
import ContentLoading from "../ui/ContentLoading";

type EditCategoryDialogProps = {
  categoryId: string;
  onClose: () => void;
};

const toastOnUdpate = (title: string): ToastParams => ({
  title: "Category updated",
  description: `Category ${title} was updated on server!`,
});

const toastOnError = (): ToastParams => ({
  variant: "destructive",
  title: "Oppps, that seems we have trouble",
});

const EditCategoryDialog: FC<EditCategoryDialogProps> = (props) => {
  const { onClose, categoryId } = props;
  const { toast } = useToast();

  const { data: category } = useCategory(categoryId);
  const { mutateAsync: editCategory } = useCategoryEdit(categoryId);

  const defaultValues = useMemo<CategoryEdit | undefined>(() => {
    if (!category) return undefined;
    const { id, createdOn, updatedOn, ...otherAttrs } = category.item;
    return otherAttrs;
  }, [category]);

  const handleSubmit = async (values: CategoryEdit) => {
    try {
      await editCategory(values);
      toast(toastOnUdpate(values.title));
      onClose();
    } catch (e) {
      toast(toastOnError());
      console.error(e);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="overflow-auto w-[40rem] h-[30rem] max-h-[80vh] max-w-[80vw]">
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>
        {defaultValues ? (
          <CategoryForm onSubmit={handleSubmit} defaultValues={defaultValues} />
        ) : (
          <ContentLoading />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
