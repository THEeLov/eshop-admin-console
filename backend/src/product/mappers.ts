import type {
  Product, ProductExtended, ProductRow, ProductRowExtended,
} from './types';

export const productRowToProduct = (row: ProductRow): Product => ({
  id: row.id,
  title: row.title,
  description: row.description,
  price: row.price,
  createdOn: row.createdOn.toISOString(),
  updatedOn: row.updatedOn.toISOString(),
  categoryId: row.categoryId,
});

export const productExtendedRowToExtendedProduct = (row: ProductRowExtended): ProductExtended => ({
  id: row.id,
  title: row.title,
  description: row.description,
  price: row.price,
  createdOn: row.createdOn.toISOString(),
  updatedOn: row.updatedOn.toISOString(),
  categoryId: row.categoryId,
  category: row.categoryTitle ? { id: row.categoryId!!, title: row.categoryTitle } : null,
});

export const productExtendedToProduct = (product: ProductExtended): Product => ({
  id: product.id,
  title: product.title,
  description: product.description,
  price: product.price,
  createdOn: product.createdOn,
  updatedOn: product.updatedOn,
  categoryId: product.categoryId,
});
