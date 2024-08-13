import { Result } from '@badrap/result';
import { sql } from 'kysely';
import db from '../../db/client';
import { ConflictError, InternalError, NotFoundError } from '../../utils';
import type { Product, ProductEdit, ProductExtended } from '../types';
import type { PaginationQuery } from '../../types';
import { productExtendedRowToExtendedProduct, productRowToProduct } from '../mappers';
import { DatabaseError } from 'pg';

export const productRepository = {
  /**
   * This function creates a new product in the database.
   * It takes a 'ProductEdit' object as input, which contains
   * the details of the product to be created.
   * The function inserts the product into the 'product' table
   * and returns the newly created product.
   * If the product cannot be created due to a conflict
   * (e.g., a product with the same ID already exists), a 'ConflictError' is returned.
   * If any other error occurs during the execution, an 'InternalError' is returned.
   *
   * @param {ProductEdit} product - The product to be created.
   * It should be an object of type 'ProductEdit'.
   * @returns {Promise<Result<Product>>} - A promise that resolves to a Result object.
   * The Result object contains either a 'Product' object (in case of success)
   * or an error (in case of failure).
   *
   * @throws {ConflictError} - Throws a 'ConflictError' if the product cannot be created
   * due to a conflict.
   * @throws {InternalError} - Throws an 'InternalError' if any other error occurs
   * during the execution.
   */
  async create(product: ProductEdit): Promise<Result<Product>> {
    try {
      const res = await db
        .insertInto('product')
        .values(product)
        .returning(['id', 'title', 'description', 'price', 'categoryId', 'createdOn', 'updatedOn'])
        .executeTakeFirst();

      if (!res) {
        return Result.err(new ConflictError());
      }
      return Result.ok(productRowToProduct(res));
    } catch (e) {
      if (e instanceof DatabaseError && e.constraint !== undefined) {
        return Result.err(new ConflictError());
      }
      return Result.err(new InternalError());
    }
  },
  /**
   * This function reads a product from the database using its ID.
   * It performs a left join with the 'category' table to fetch the category details of the product.
   * If the product is found, it is mapped to a 'ProductExtended' object and returned.
   * If the product is not found, an error is returned.
   * If any other error occurs during the execution, an 'InternalError' is returned.
   *
   * @param {string} id - The ID of the product to be read.
   * @returns {Promise<Result<ProductExtended>>} - A promise that resolves to a Result object.
   * The Result object contains either a 'ProductExtended' object (in case of success)
   * or an error (in case of failure).
   * 'ProductExtended' is an extended version of the 'Product' type that includes
   * the title of the category to which the product belongs.
   *
   * @throws {Error} - Throws an error if the product is not found.
   * @throws {InternalError} - Throws an 'InternalError' if any other error occurs
   * during the execution.
   */
  async read(id: string): Promise<Result<ProductExtended>> {
    try {
      const res = await db
        .selectFrom('product')
        .leftJoin('category', 'product.categoryId', 'category.id')
        .select(['product.id as id', 'product.title as title', 'product.description as description', 'price', 'product.createdOn as createdOn', 'product.updatedOn as updatedOn', 'product.categoryId as categoryId', 'category.title as categoryTitle'])
        .where('product.id', '=', id)
        .executeTakeFirst();

      if (!res) {
        return Result.err(new NotFoundError('Failed to read product'));
      }
      return Result.ok(productExtendedRowToExtendedProduct(res));
    } catch (e) {
      return Result.err(new InternalError());
    }
  },
  /**
   * This function calculates the total number of pages needed to display all
   * products, assuming 10 products per page. It counts the total number of
   * products in the 'product' table and divides it by 10 (rounding up to the
   * nearest whole number). If the count is successful, the total number of
   * pages is returned. If no products are found, a 'NotFoundError' is returned.
   * If any other error occurs during the execution, an 'InternalError' is
   * returned.
   *
   * @returns {Promise<Result<number>>} - A promise that resolves to a Result
   * object. The Result object contains either a number (in case of success) or
   * an error (in case of failure). The number represents the total number of
   * pages needed to display all products.
   *
   * @throws {NotFoundError} - Throws a 'NotFoundError' if no products are found.
   * @throws {InternalError} - Throws an 'InternalError' if any other error
   * occurs during the execution.
   */
  async getPages(): Promise<Result<number>> {
    try {
      const count = await db
        .selectFrom('product')
        .select(({ fn }) => fn.count<number>('product.id').as('count'))
        .executeTakeFirst();

      if (!count) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(Math.ceil(count.count / 10));
    } catch (e) {
      return Result.err(new InternalError());
    }
  },
  /**
   * This function reads a page of products from the database.
   * It performs a left join with the 'category' table to fetch the
   * category details of each product.
   * The function takes a 'PaginationQuery' object as input, which contains the
   * details of the page to be read.
   * If the 'page' property of the 'PaginationQuery' object is defined,
   * the function reads the corresponding page of products
   * (assuming 10 products per page). If the 'page' property is not defined,
   * the function reads all products.
   * The products are sorted by their title in ascending order.
   * Each product is mapped to a 'ProductExtended' object and returned in an array.
   * If no products are found, a 'NotFoundError' is returned.
   * If any other error occurs during the execution, an 'InternalError' is returned.
   *
   * @param {PaginationQuery} paging - The pagination query. It should be
   * an object of type 'PaginationQuery'.
   * @returns {Promise<Result<ProductExtended[]>>} - A promise that resolves
   * to a Result object.
   * The Result object contains either an array of 'ProductExtended'
   * objects (in case of success) or an error (in case of failure).
   *
   * @throws {NotFoundError} - Throws a 'NotFoundError' if no products are found.
   * @throws {InternalError} - Throws an 'InternalError' if any other
   * error occurs during the execution.
   */
  async readPaged(paging: PaginationQuery): Promise<Result<ProductExtended[]>> {
    try {
      let queryBuilder = db
        .selectFrom('product')
        .leftJoin('category', 'product.categoryId', 'category.id')
        .select(['product.id as id', 'product.title as title', 'product.description as description', 'price', 'product.createdOn as createdOn', 'product.updatedOn as updatedOn', 'product.categoryId as categoryId', 'category.title as categoryTitle']);

      if (paging.page) {
        queryBuilder = queryBuilder
          .limit(10)
          .offset((paging.page - 1) * 10);
      }

      const res = await queryBuilder.orderBy('title').execute();

      if (!res) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(res.map(productExtendedRowToExtendedProduct));
    } catch (e) {
      return Result.err(new InternalError());
    }
  },
  /**
   * This function updates a product in the database.
   * It takes a 'ProductEdit' object and the product's ID as input.
   * The function updates the product in the 'product' table and
   * returns the updated product.
   * If the product cannot be updated (e.g., the product does not exist),
   * an error is returned.
   * If any other error occurs during the execution, an 'InternalError' is returned.
   *
   * @param {string} id - The ID of the product to be updated.
   * @param {ProductEdit} product - The new details of the product.
   * It should be an object of type 'ProductEdit'.
   * @returns {Promise<Result<Product>>} - A promise that resolves to a Result object.
   * The Result object contains either a 'Product' object (in case of success)
   * or an error (in case of failure).
   *
   * @throws {NotFoundError} - Throws an error if the product cannot be updated.
   * @throws {InternalError} - Throws an 'InternalError' if any other error occurs
   * during the execution.
   */
  async update(id: string, product: ProductEdit): Promise<Result<Product>> {
    try {
      const res = await db
        .updateTable('product')
        .set({
          title: product.title,
          description: product.description,
          price: product.price,
          categoryId: product.categoryId,
          updatedOn: sql`now()`,
        })
        .where('id', '=', id)
        .returning(['id', 'title', 'description', 'price', 'categoryId', 'createdOn', 'updatedOn'])
        .executeTakeFirst();

      if (!res) {
        return Result.err(new NotFoundError('Failed to update product'));
      }
      return Result.ok(productRowToProduct(res));
    } catch (e) {
      if (e instanceof DatabaseError && e.constraint !== undefined) {
        return Result.err(new ConflictError());
      }
      return Result.err(new InternalError());
    }
  },
  /**
   * This function deletes a product from the database.
   * It takes the product's ID as input.
   * The function deletes the product from the 'product' table.
   * If the product cannot be deleted (e.g., the product does not exist),
   * an error is returned.
   * If any other error occurs during the execution, an 'InternalError' is returned.
   *
   * @param {string} id - The ID of the product to be deleted.
   * @returns {Promise<Result<void>>} - A promise that resolves to a Result object.
   * The Result object contains either 'undefined' (in case of success)
   * or an error (in case of failure).
   *
   * @throws {NotFoundError} - Throws an error if the product cannot be deleted.
   * @throws {InternalError} - Throws an 'InternalError' if any other error occurs
   * during the execution.
   */
  async delete(id: string): Promise<Result<void>> {
    try {
      const res = await db
        .deleteFrom('product')
        .where('id', '=', id)
        .execute();

      if (!res) {
        return Result.err(new NotFoundError('Failed to delete product'));
      }
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(new InternalError());
    }
  },
};

export default productRepository;
