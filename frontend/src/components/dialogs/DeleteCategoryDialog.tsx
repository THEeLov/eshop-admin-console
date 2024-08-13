import { FC } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useCategory, useCategoryDelete } from "../../hooks/useCategories";
import { Button } from "../ui/button";
import { ToastParams, useToast } from "../ui/use-toast";

type DeleteCategoryDialogProps = {
  onClose: () => void;
  categoryId: string;
};

const toastOnDelete = (title: string): ToastParams => ({
  title: "Category deleted",
  description: `Category ${title} was deleted on server!`,
});

const toastOnError = (): ToastParams => ({
  variant: "destructive",
  title: "Oppps, that seems we have trouble",
});

const DeleteCategoryDialog: FC<DeleteCategoryDialogProps> = (props) => {
  const { onClose, categoryId } = props;
  const { toast } = useToast();

  const { data: category } = useCategory(categoryId);
  const { mutateAsync: deleteCategory } = useCategoryDelete(categoryId);

  const handleDelete = async () => {
    try {
      await deleteCategory();
      toast(toastOnDelete(category?.item.title ?? ""));
      onClose();
    } catch (e) {
      toast(toastOnError());
      console.error(e);
    }
  };

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            category our servers.
          </AlertDialogDescription>
          <AlertDialogDescription className="font-semibold">
            Category: {category?.item.title ?? ""}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCategoryDialog;
