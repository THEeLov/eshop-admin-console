import type { BaseModelId, BaseModelTimestamps, DateModelTimestamps } from '../types';
import type { CategoryBasic } from '../category/types';

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

export type ProductEdit = Omit<Product, 'id' | 'createdOn' | 'updatedOn'>;

export type ProductRow = (ProductBasic & DateModelTimestamps) & {
  description: string;
  price: number;
  categoryId: string | null;
};

export type ProductRowExtended = ProductRow & {
  categoryTitle: string | null;
};
