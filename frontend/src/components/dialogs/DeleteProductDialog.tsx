import { FC } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useProduct, useProductDelete } from "../../hooks/useProducts";
import { ToastParams, useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

type DeleteProductDialogProps = {
  onClose: () => void;
  productId: string;
};

const toastOnDelete = (title: string): ToastParams => ({
  title: "Product deleted",
  description: `Product ${title} was deleted on server!`,
});

const toastOnError = (): ToastParams => ({
  variant: "destructive",
  title: "Oppps, that seems we have trouble",
});

const DeleteProductDialog: FC<DeleteProductDialogProps> = (props) => {
  const { onClose, productId } = props;
  const { toast } = useToast();

  const { data: product } = useProduct(productId);
  const { mutateAsync: deleteProduct } = useProductDelete(productId);

  const handleDelete = async () => {
    try {
      await deleteProduct();
      toast(toastOnDelete(product?.item.title ?? ""));
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
            product our servers.
          </AlertDialogDescription>
          <AlertDialogDescription className="font-semibold">
            Product: {product?.item.title ?? ""}
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

export default DeleteProductDialog;
