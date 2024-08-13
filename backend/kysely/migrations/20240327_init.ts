import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable('category')
    .addColumn('id', 'uuid', (col) => col.defaultTo(sql`gen_random_uuid()`).primaryKey())
    .addColumn('title', 'text', (col) => col.unique().notNull())
    .addColumn('description', 'text', (col) => col.notNull())
    .addColumn('createdOn', 'timestamptz', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updatedOn', 'timestamptz', (col) => col.defaultTo(sql`now()`).notNull())
    .execute();

  await db.schema.createTable('product')
    .addColumn('id', 'uuid', (col) => col.defaultTo(sql`gen_random_uuid()`).primaryKey())
    .addColumn('title', 'text', (col) => col.unique().notNull())
    .addColumn('description', 'text', (col) => col.notNull())
    .addColumn('price', 'integer', (col) => col.notNull().check(sql`price >= 0`))
    .addColumn('categoryId', 'uuid')
    .addColumn('createdOn', 'timestamptz', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updatedOn', 'timestamptz', (col) => col.defaultTo(sql`now()`).notNull())
    .addForeignKeyConstraint('product_category_fk', ['categoryId'], 'category', ['id'], (cb) => cb.onDelete('cascade'))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('product').execute();
  await db.schema.dropTable('category').execute();
}
