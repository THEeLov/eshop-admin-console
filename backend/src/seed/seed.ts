import { config } from 'dotenv';
import { categories, products } from './seedData/seedData';
import db from '../db/client';

config();

const seed = async () => {
  console.log('Seeding started');
  await db.transaction().execute(async (trx) => {
    await trx.insertInto('category').values(categories).execute();

    await trx.insertInto('product').values(products).execute();
  });
};

seed()
  .then(() => {
    console.log('Seeding finished');
    process.exit(0);
  })
  .catch((e) => {
    console.error('Seeding failed', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.destroy();
  });
