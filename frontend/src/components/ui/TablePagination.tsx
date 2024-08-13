import { Pagination as RespPagination } from "../../models/response";
import { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { cn } from "../../utils";

type TablePaginationProps = {
  pagination: RespPagination;
  className?: string;
  onSelect: (page: number) => void;
};

const hasPrev = ({ currentPage }: RespPagination) => {
  return currentPage > 1;
};

const hasNext = ({ currentPage, totalPages }: RespPagination) => {
  return currentPage < totalPages;
};

const getBefore = ({ currentPage, totalPages }: RespPagination) => {
  if (!hasPrev({ currentPage, totalPages })) return [];

  let beforePages: number[] = [];
  for (let i = currentPage - 1; i > 0; i--) beforePages = [i, ...beforePages];
  return beforePages;
};

const getAfter = ({ currentPage, totalPages }: RespPagination) => {
  if (!hasNext({ currentPage, totalPages })) return [];

  const afterPages = [];
  for (let i = currentPage + 1; i <= totalPages; i++) afterPages.push(i);
  return afterPages;
};

const TablePagination: FC<TablePaginationProps> = (props) => {
  const { pagination, onSelect, className } = props;

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        {hasPrev(pagination) && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onSelect(pagination.currentPage - 1)}
            />
          </PaginationItem>
        )}
        {getBefore(pagination).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink onClick={() => onSelect(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink isActive>{pagination.currentPage}</PaginationLink>
        </PaginationItem>
        {getAfter(pagination).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink onClick={() => onSelect(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {hasNext(pagination) && (
          <PaginationItem>
            <PaginationNext
              onClick={() => onSelect(pagination.currentPage + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
