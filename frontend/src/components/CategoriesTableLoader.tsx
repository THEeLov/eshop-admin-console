import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Skeleton } from "./ui/skeleton";

const CategoriesTableLoader = () => {
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
              <TableCell className="flex gap-3">
                <Skeleton className="w-[20px] h-[20px] my-1.5 rounded-full" />
                <Skeleton className="w-[20px] h-[20px] my-1.5 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CategoriesTableLoader;
