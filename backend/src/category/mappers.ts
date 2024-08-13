import type { Category, CategoryBasic, CategoryRow } from './types';

export const categoryRowToCategory = (row: CategoryRow): Category => ({
  id: row.id,
  title: row.title,
  description: row.description,
  createdOn: row.createdOn.toISOString(),
  updatedOn: row.updatedOn.toISOString(),
});

export const categoryToBasicCategory = (category: Category): CategoryBasic => ({
  id: category.id,
  title: category.title,
});
