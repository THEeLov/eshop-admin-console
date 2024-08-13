import { Result } from '@badrap/result';
import { sql } from 'kysely';
import type {
  Category, CategoryEdit,
} from '../types';
import db from '../../db/client';
 import type { PaginationQuery } from '../../types';
import { categoryRowToCategory } from '../mappers';
import { DatabaseError } from 'pg';
import { ConflictError, InternalError, NotFoundError } from "../../utils";


export const categoryRepository = {
  /**
   * This function creates a new category in the database.
   * It takes a 'CategoryEdit' object as input, which contains
   * the details of the category to be created.
   * The function inserts the category into the 'category' table
   * and returns the newly created category.
   * If the category cannot be created due to a conflict
   * (e.g., a category with the same ID already exists), a 'ConflictError' is returned.
   * If any other error occurs during the execution, an 'InternalError' is returned.
   *
   * @param {CategoryEdit} category - The category to be created.
   * It should be an object of type 'CategoryEdit'.
   * @returns {Promise<Result<Category>>} - A promise that resolves to a Result object.
   * The Result object contains either a 'Category' object (in case of success)
   * or an error (in case of failure).
   *
   * @throws {ConflictError} - Throws a 'ConflictError' if the category cannot be created
   * due to a conflict.
   * @throws {InternalError} - Throws an 'InternalError' if any other error occurs
   * during the execution.
   */
  async create(category: CategoryEdit): Promise<Result<Category>> {
    try {
      const res = await db
        .insertInto('category')
        .values(category)
        .returning(['id', 'title', 'description', 'createdOn', 'updatedOn'])
        .executeTakeFirst();

      if (!res) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(categoryRowToCategory(res));
    } catch (e) {
      if (e instanceof DatabaseError && e.constraint !== undefined) {
        return Result.err(new ConflictError());
      }
      return Result.err(new InternalError());
    }
  },
  /**
   * This function reads a category from the database using its ID.
   * If the category is found, it is returned.
   * If the category is not found, an error is returned.
   * If any other error occurs during the execution, an 'InternalError' is returned.
   *
   * @param {string} id - The ID of the category to be read.
   * @returns {Promise<Result<Category>>} - A promise that resolves to a Result object.
   * The Result object contains either a 'Category' object (in case of success)
   * or an error (in case of failure).
   *
   * @throws {NotFoundError} - Throws a 'NotFoundError' if the category is not found.
   * @throws {InternalError} - Throws an 'InternalError' if any other error occurs
   * during the execution.
   */
  async read(id: string): Promise<Result<Category>> {
    try {
      const res = await db
        .selectFrom('category')
        .select(['id', 'title', 'description', 'createdOn', 'updatedOn'])
        .where('id', '=', id)
        .executeTakeFirst();

      if (!res) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(categoryRowToCategory(res));
    } catch (e) {
      return Result.err(new InternalError());
    }
  },
  /**
   * This function calculates the total number of pages needed to display all
   * categories, assuming 10 categories per page. It counts the total number of
   * categories in the 'category' table and divides it by 10 (rounding up to the
   * nearest whole number). If the count is successful, the total number of
   * pages is returned. If no categories are found, a 'NotFoundError' is returned.
   * If any other error occurs during the execution, an 'InternalError' is
   * returned.
   *
   * @returns {Promise<Result<number>>} - A promise that resolves to a Result
   * object. The Result object contains either a number (in case of success) or
   * an error (in case of failure). The number represents the total number of
   * pages needed to display all categories.
   *
   * @throws {NotFoundError} - Throws a 'NotFoundError' if no categories are found.
   * @throws {InternalError} - Throws an 'InternalError' if any other error
   * occurs during the execution.
   */
  async getPages(): Promise<Result<number>> {
    try {
      const count = await db
        .selectFrom('category')
        .select(({ fn }) => fn.count<number>('category.id').as('count'))
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
   * This function reads a page of categories from the database.
   * The function takes a 'PaginationQuery' object as input,
   * which contains the details of the page to be read.
   * If the 'page' property of the 'PaginationQuery' object is defined,
   * the function reads the corresponding page of categories
   * (assuming 10 categories per page). If the 'page' property is not defined,
   * the function reads all categories.
   * The categories are sorted by their title in ascending order.
   * Each category is returned in an array.
   * If no categories are found, a 'NotFoundError' is returned.
   * If any other error occurs during the execution, an 'InternalError' is returned.
   *
   * @param {PaginationQuery} paging - The pagination query. It should be
   * an object of type 'PaginationQuery'.
   * @returns {Promise<Result<Category[]>>} - A promise that resolves to a Result object.
   * The Result object contains either an array of 'Category' objects
   * (in case of success) or an error (in case of failure).
   *
   * @throws {NotFoundError} - Throws a 'NotFoundError' if no categories are found.
   * @throws {InternalError} - Throws an 'InternalError'
   * if any other error occurs during the execution.
   */
  async readPaged(paging: PaginationQuery): Promise<Result<Category[]>> {
    try {
      let queryBuilder = db
        .selectFrom('category')
        .select(['id', 'title', 'description', 'createdOn', 'updatedOn']);

      if (paging.page) {
        queryBuilder = queryBuilder
          .limit(10)
          .offset((paging.page - 1) * 10);
      }

      const res = await queryBuilder.orderBy('title').execute();

      if (!res) {
        return Result.err(new Error('Failed to read categories'));
      }
      return Result.ok(res.map(categoryRowToCategory));
    } catch (e) {
      return Result.err(new InternalError());
    }
  },
  /**
   * This function updates a category in the database.
   * It takes a 'CategoryEdit' object and the category's ID as input.
   * The function updates the category in the 'category' table and
   * returns the updated category.
   * If the category cannot be updated (e.g., the category does not exist),
   * an error is returned.
   * If any other error occurs during the execution, an 'InternalError' is returned.
   *
   * @param {string} id - The ID of the category to be updated.
   * @param {CategoryEdit} category - The new details of the category.
   * It should be an object of type 'CategoryEdit'.
   * @returns {Promise<Result<Category>>} - A promise that resolves to a Result object.
   * The Result object contains either a 'Category' object (in case of success)
   * or an error (in case of failure).
   *
   * @throws {NotFoundError} - Throws a 'NotFoundError' if the category cannot be updated.
   * @throws {InternalError} - Throws an 'InternalError' if any other error occurs
   * during the execution.
   */
  async update(id: string, category: CategoryEdit): Promise<Result<Category>> {
    try {
      const res = await db
        .updateTable('category')
        .set({
          title: category.title,
          description: category.description,
          updatedOn: sql`now()`,
        })
        .where('id', '=', id)
        .returning(['id', 'title', 'description', 'createdOn', 'updatedOn'])
        .executeTakeFirst();

      if (!res) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(categoryRowToCategory(res));
    } catch (e) {
      if (e instanceof DatabaseError && e.constraint !== undefined) {
        return Result.err(new ConflictError());
      }
      return Result.err(new InternalError());
    }
  },
  /**
   * This function deletes a category from the database.
   * It takes the category's ID as input.
   * The function deletes the category from the 'category' table.
   * If the category cannot be deleted (e.g., the category does not exist),
   * an error is returned.
   * If any other error occurs during the execution, an 'InternalError' is returned.
   *
   * @param {string} id - The ID of the category to be deleted.
   * @returns {Promise<Result<void>>} - A promise that resolves to a Result object.
   * The Result object contains either 'undefined' (in case of success)
   * or an error (in case of failure).
   *
   * @throws {NotFoundError} - Throws a 'NotFoundError' if the category cannot be deleted.
   * @throws {InternalError} - Throws an 'InternalError' if any other error occurs
   * during the execution.
   */
  async delete(id: string): Promise<Result<void>> {
    try {
      const res = await db
        .deleteFrom('category')
        .where('id', '=', id)
        .execute();

      if (!res) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(new InternalError());
    }
  },
};

export default categoryRepository;
