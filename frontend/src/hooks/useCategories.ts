import { CategoryEdit } from "../models/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CategoriesApi from "../api/categoryApi";
import { ReqPagination } from "../models/request";

export const useCategoriesBasic = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoriesApi.getAll(),
  });

  return { data, isLoading };
};

export const useCategoriesPaginated = (page: number) => {
  const pageNumber: ReqPagination = {
    page: page,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["categories", page],
    queryFn: () => CategoriesApi.getAllPaginated(pageNumber),
  });

  return { data, isLoading };
};

export const useCategory = (id: string) => {
  const { data } = useQuery({
    queryKey: ["category", id],
    queryFn: () => CategoriesApi.getSingle(id),
  });

  return { data };
};

export const useCategoryCreate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (payload: CategoryEdit) => CategoriesApi.createSingle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { mutateAsync };
};

export const useCategoryEdit = (id: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (payload: CategoryEdit) =>
      CategoriesApi.updateSingle(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { mutateAsync };
};

export const useCategoryDelete = (id: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: () => CategoriesApi.deleteSingle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { mutateAsync };
};
