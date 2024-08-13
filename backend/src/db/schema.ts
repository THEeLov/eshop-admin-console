import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Category {
  createdOn: Generated<Timestamp>;
  description: string;
  id: Generated<string>;
  title: string;
  updatedOn: Generated<Timestamp>;
}

export interface Product {
  categoryId: string | null;
  createdOn: Generated<Timestamp>;
  description: string;
  id: Generated<string>;
  price: number;
  title: string;
  updatedOn: Generated<Timestamp>;
}

export interface DB {
  category: Category;
  product: Product;
}
