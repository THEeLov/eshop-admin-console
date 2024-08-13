import { ProductEdit } from "../models/product";
import ProductApi from "../api/productsApi";
import "../api/baseApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReqPagination } from "../models/request";

export const useProducts = (page: number) => {
  const pageNumber: ReqPagination = {
    page: page,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: () => ProductApi.getAllExtendedPaginated(pageNumber),
  });

  return { data, isLoading };
};

export const useProduct = (id: string) => {
  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => ProductApi.getSingle(id),
  });

  return { data };
};

export const useProductCreate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (payload: ProductEdit) => ProductApi.createSingle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { mutateAsync };
};

export const useProductEdit = (id: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (payload: ProductEdit) => ProductApi.updateSingle(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { mutateAsync };
};

export const useProductDelete = (id: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: () => ProductApi.deleteSingle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { mutateAsync };
};
