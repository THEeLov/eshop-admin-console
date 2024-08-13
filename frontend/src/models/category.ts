import { BaseModelId, BaseModelTimestamps } from "./base";

export type CategoryBasic = BaseModelId & {
  title: string;
};

export type Category = (CategoryBasic & BaseModelTimestamps) & {
  description: string;
};

export type CategoryEdit = Omit<Category, "id" | "createdOn" | "updatedOn">;
