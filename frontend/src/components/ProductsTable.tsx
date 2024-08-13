import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ProductExtended } from "../models/product";
import EditButton from "./ui/EditButton";
import DeleteButton from "./ui/DeleteButton";
import DeleteProductDialog from "./dialogs/DeleteProductDialog";
import EditProductDialog from "./dialogs/EditProductDialog";
import { Badge } from "./ui/badge";

type ProductsTableProps = {
  data: ProductExtended[];
};

let { format: dollarFormat } = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const ProductsTable: FC<ProductsTableProps> = (props) => {
  const { data } = props;

  const [editingEntityId, setEditingEntityId] = useState<string | null>(null);
  const handleEntityEdit = (id: string) => () => setEditingEntityId(id);
  const handleCloseEditDialog = () => setEditingEntityId(null);

  const [deletingEntityId, setDeletingEntityId] = useState<string | null>(null);
  const handleEntityDelete = (id: string) => () => setDeletingEntityId(id);
  const handleCloseDeleteDialog = () => setDeletingEntityId(null);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[20%] max-w-[100px]">Title</TableHead>
          <TableHead className="w-[20%] max-w-[110px]">Description</TableHead>
          <TableHead className="w-[20%]">Category</TableHead>
          <TableHead className="w-[20%]">Price</TableHead>
          <TableHead className="w-[24px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium max-w-[200px] truncate">
              {product.title}
            </TableCell>
            <TableCell className="max-w-[200px] truncate">
              {product.description}
            </TableCell>
            <TableCell>
              {product.category && <Badge>{product.category.title}</Badge>}
            </TableCell>
            <TableCell>{dollarFormat(product.price)}</TableCell>
            <TableCell className="flex">
              <EditButton onClick={handleEntityEdit(product.id)} />
              <DeleteButton onClick={handleEntityDelete(product.id)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {editingEntityId !== null && (
        <EditProductDialog
          productId={editingEntityId}
          onClose={handleCloseEditDialog}
        />
      )}
      {deletingEntityId !== null && (
        <DeleteProductDialog
          productId={deletingEntityId}
          onClose={handleCloseDeleteDialog}
        />
      )}
    </Table>
  );
};

export default ProductsTable;
