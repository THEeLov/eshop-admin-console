import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { env } from 'process';
import categoryRouter from './category/routers/category.router'
import productRouter from './product/routers/product.router'

config();

const app = express();
const port = env.PORT ?? 3000;

// CORS middleware
app.use(cors());

// JSON middleware
app.use(express.json());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));

// DO NOT MODIFY THE PRECEDING code ^^

app.use('/products', productRouter)
app.use('/categories', categoryRouter);

// TODO Add routers for categories and products

// DO NOT MODIFY THE FOLLOWING code:

// No route was taken - 404 - Resource (API endpoint) not found.
// Default route returning 404
app.use((_req, res) => {
  res.status(404).send('Not found');
});

if (env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(
      `[${new Date().toISOString()}] RESTful API for iteration 02 is listening on port ${port}`,
    );
  });
}
