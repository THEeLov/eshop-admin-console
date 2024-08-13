import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import CategoryForm from "../forms/CategoryForm";
import { CategoryEdit } from "../../models/category";
import { useCategoryCreate } from "../../hooks/useCategories";
import { useToast, type ToastParams } from "../ui/use-toast";

type CreateCategoryDialogProps = {
  onClose: () => void;
};

const toastOnCreate = (title: string): ToastParams => ({
  title: "Category created",
  description: `Category ${title} was created on server!`,
});

const toastOnError = (): ToastParams => ({
  variant: "destructive",
  title: "Oppps, that seems we have trouble",
});

const CreateCategoryDialog: FC<CreateCategoryDialogProps> = (props) => {
  const { onClose } = props;
  const { toast } = useToast();

  const { mutateAsync: createCategory } = useCategoryCreate();

  const handleSubmit = async (values: CategoryEdit) => {
    try {
      await createCategory(values);
      toast(toastOnCreate(values.title));
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
          <DialogTitle>Create new category</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>
        <CategoryForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
