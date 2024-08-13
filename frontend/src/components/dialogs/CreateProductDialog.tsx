import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ProductForm from "../forms/ProductForm";
import { ProductEdit } from "../../models/product";
import { ToastParams, useToast } from "../ui/use-toast";
import { useProductCreate } from "../../hooks/useProducts";

type CreateProductDialogProps = {
  onClose: () => void;
};

const toastOnCreate = (title: string): ToastParams => ({
  title: "Product created",
  description: `Product ${title} was created on server!`,
});

const toastOnError = (): ToastParams => ({
  variant: "destructive",
  title: "Oppps, that seems we have trouble",
});

const CreateProductDialog: FC<CreateProductDialogProps> = (props) => {
  const { onClose } = props;
  const { toast } = useToast();

  const { mutateAsync: createProduct } = useProductCreate();

  const handleSubmit = async (values: ProductEdit) => {
    try {
      if (values.categoryId === "null") {
        values.categoryId = null;
      } //Set to null if empty string
      await createProduct(values);
      toast(toastOnCreate(values.title));
      onClose();
    } catch (e) {
      toast(toastOnError());
      console.error(e);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="overflow-auto w-[40rem] h-[35rem] max-h-[80vh] max-w-[80vw]">
        <DialogHeader>
          <DialogTitle>Create new product</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>
        <ProductForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;
