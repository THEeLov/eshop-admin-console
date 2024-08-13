import type { BaseModelId, BaseModelTimestamps, DateModelTimestamps } from '../types';

export type CategoryBasic = BaseModelId & {
  title: string;
};

export type Category = (CategoryBasic & BaseModelTimestamps) & {
  description: string;
};

export type CategoryEdit = Omit<Category, 'id' | 'createdOn' | 'updatedOn'>;

export type CategoryRow = (CategoryBasic & DateModelTimestamps) & {
  description: string;
};
