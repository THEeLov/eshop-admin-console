import { FC, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ProductEdit } from "../../models/product";
import ProductForm from "../forms/ProductForm";
import { useProduct, useProductEdit } from "../../hooks/useProducts";
import { ToastParams, useToast } from "../ui/use-toast";
import ContentLoading from "../ui/ContentLoading";

type EditProductDialogProps = {
  productId: string;
  onClose: () => void;
};

const toastOnUpdate = (title: string): ToastParams => ({
  title: "Product updated",
  description: `Product ${title} was updated on server!`,
});

const toastOnError = (): ToastParams => ({
  variant: "destructive",
  title: "Oppps, that seems we have trouble",
});

const EditProductDialog: FC<EditProductDialogProps> = (props) => {
  const { onClose, productId } = props;
  const { toast } = useToast();

  const { data: product } = useProduct(productId);
  const { mutateAsync: editProduct } = useProductEdit(productId);

  const defaultValues = useMemo<ProductEdit | undefined>(() => {
    if (!product) return undefined;
    const { id, createdOn, updatedOn, ...otherAttrs } = product.item;
    return otherAttrs;
  }, [product]);

  const handleSubmit = async (values: ProductEdit) => {
    try {
      if (values.categoryId === "null") {
        values.categoryId = null;
      } //Set to null if empty string
      await editProduct(values);
      toast(toastOnUpdate(values.title));
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
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>
        {defaultValues ? (
          <ProductForm onSubmit={handleSubmit} defaultValues={defaultValues} />
        ) : (
          <ContentLoading />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
