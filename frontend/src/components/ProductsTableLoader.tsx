import { Skeleton } from "./ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const ProductsTableLoader = () => {
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
        {new Array(10).fill(null).map((_, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium max-w-[200px] truncate">
              <Skeleton className="w-[120px] my-1.5 h-[20px] rounded-full" />
            </TableCell>
            <TableCell className="max-w-[200px] truncate">
              <Skeleton className="w-[160px] my-1.5 h-[20px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[110px] my-1.5 h-[20px] rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[110px] my-1.5 h-[20px] rounded-full" />
            </TableCell>
            <TableCell className="flex gap-3">
              <Skeleton className="w-[20px] h-[20px] my-1.5 rounded-full" />
              <Skeleton className="w-[20px] h-[20px] my-1.5 rounded-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTableLoader;
