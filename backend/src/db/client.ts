import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { env } from 'process';
import { config } from 'dotenv';
import type { DB } from './schema';

config();

const dialect = new PostgresDialect({
  pool: new Pool({
    database: env.POSTGRES_DB,
    host: env.POSTGRES_HOST,
    user: env.POSTGRES_USER,
    port: Number(env.POSTGRES_PORT),
    password: env.POSTGRES_PASSWORD,
    max: 10,
  }),
});

const db = new Kysely<DB>({
  dialect,
});

export default db;
