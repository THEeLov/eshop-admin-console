import { BaseModelId, BaseModelTimestamps } from "./base";
import { CategoryBasic } from "./category";

export type ProductBasic = BaseModelId & {
  title: string;
};

export type Product = (ProductBasic & BaseModelTimestamps) & {
  description: string;
  price: number;
  categoryId: string | null;
};

export type ProductExtended = Product & {
  category: CategoryBasic | null;
};

export type ProductEdit = Omit<Product, "id" | "createdOn" | "updatedOn">;
