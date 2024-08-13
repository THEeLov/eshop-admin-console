import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Category } from "../models/category";
import EditCategoryDialog from "./dialogs/EditCategoryDialog";
import EditButton from "./ui/EditButton";
import DeleteButton from "./ui/DeleteButton";
import DeleteCategoryDialog from "./dialogs/DeleteCategoryDialog";

type CategoriesTableProps = {
  data: Category[];
};

const CategoriesTable: FC<CategoriesTableProps> = (props) => {
  const { data } = props;

  const [editingEntityId, setEditingEntityId] = useState<string | null>(null);
  const handleEntityEdit = (id: string) => () => setEditingEntityId(id);
  const handleCloseEditDialog = () => setEditingEntityId(null);

  const [deletingEntityId, setDeletingEntityId] = useState<string | null>(null);
  const handleEntityDelete = (id: string) => () => setDeletingEntityId(id);
  const handleCloseDeleteDialog = () => setDeletingEntityId(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%] max-w-[200px]">Title</TableHead>
            <TableHead className="w-[40%] max-w-[200px]">Description</TableHead>
            <TableHead className="w-[30%]">Created</TableHead>
            <TableHead className="w-[24px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium max-w-[200px] truncate">
                {category.title}
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {category.description}
              </TableCell>
              <TableCell>
                {new Date(category.createdOn).toLocaleString()}
              </TableCell>
              <TableCell className="flex">
                <EditButton onClick={handleEntityEdit(category.id)} />
                <DeleteButton onClick={handleEntityDelete(category.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingEntityId !== null && (
        <EditCategoryDialog
          categoryId={editingEntityId}
          onClose={handleCloseEditDialog}
        />
      )}
      {deletingEntityId !== null && (
        <DeleteCategoryDialog
          categoryId={deletingEntityId}
          onClose={handleCloseDeleteDialog}
        />
      )}
    </>
  );
};

export default CategoriesTable;
