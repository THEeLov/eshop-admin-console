import { Request, Response } from "express";
import productRepositary from "../repositories/product.repository";
import { ProductEdit } from "../types";
import { PaginationQuery } from "../../types";
import { handleRepositoryErrors, parseRequest } from "../../utils";
import {
  createUpdateSchema,
  pageNumberSchema,
  idSchema,
} from "../validationSchemas/validationSchemas";

async function getAll(req: Request, res: Response) {
  let parameters: PaginationQuery = {};
  if (req.query.page !== undefined) {
    const request = await parseRequest(pageNumberSchema, req, res);
    if (request === null) {
      return;
    }

    parameters = {
      page: request.query.page,
      type: "extended",
    };
  }

  const result = await productRepositary.readPaged(parameters);
  const numberOfPages = await productRepositary.getPages();

  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return res;
  }

  if (numberOfPages.isErr) {
    handleRepositoryErrors(numberOfPages.error, res);
    return res;
  }

  return res.status(200).json({
    items: result.value,
    pagination: {
      currentPage: parameters.page,
      totalPages: numberOfPages.value,
    },
    message: "Products successfully loaded",
  });
}

async function getSingle(req: Request, res: Response) {
  const request = await parseRequest(idSchema, req, res);
  if (request === null) {
    return;
  }

  const result = await productRepositary.read(request.params.id);

  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return res;
  }

  return res.status(200).json({
    item: result.value,
  });
}

async function createSingle(req: Request, res: Response) {
  const request = await parseRequest(createUpdateSchema, req, res);
  if (request === null) {
    return;
  }

  const payload: ProductEdit = req.body;
  const result = await productRepositary.create(payload);

  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return res;
  }

  return res.status(200).json({ message: "Product successfully created" });
}

async function updateSingle(req: Request, res: Response) {
  const request = await parseRequest(createUpdateSchema, req, res);
  if (request === null) {
    return;
  }

  const productId: string | undefined = req.params.id;
  const payload: ProductEdit = req.body;
  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  const result = await productRepositary.update(productId, payload);

  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return res;
  }

  return res.status(200).json({ message: "Product successfully updated" });
}

async function deleteSingle(req: Request, res: Response) {
  const request = await parseRequest(idSchema, req, res);
  if (request === null) {
    return;
  }

  const result = await productRepositary.delete(request.params.id);

  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return res;
  }

  return res.status(200).json({ message: "Product successfully deleted" });
}

export default {
  getAll,
  getSingle,
  createSingle,
  updateSingle,
  deleteSingle,
};
