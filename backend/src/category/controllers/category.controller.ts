import { Request, Response } from "express";
import categoryRepository from "../repositories/category.repository";
import { PaginationQuery } from "../../types";
import {  
  createUpdateCategorySchema,
  pageNumberCategorySchema,
  idCategorySchema,
} from "../validationSchemas/validationSchemas";
import { handleRepositoryErrors } from "../../utils";
import { parseRequest } from "../../utils";

async function getAll(req: Request, res: Response) {
  let parameters: PaginationQuery = {};
  if (req.query.page !== undefined) {
    const request = await parseRequest(pageNumberCategorySchema, req, res);
    if (request === null) {
      return;
    }

    parameters = {
      page: request.query.page,
    };
  }
  const result = await categoryRepository.readPaged(parameters);
  const numberOfPages = await categoryRepository.getPages();

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
    message: "Categories successfully loaded",
  });
}

async function getSingle(req: Request, res: Response) {
  const request = await parseRequest(idCategorySchema, req, res);
  if (request === null) {
    return;
  }

  const result = await categoryRepository.read(request.params.id);
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return res;
  }

  return res.status(200).json({
    item: result.value,
  });
}

async function createSingle(req: Request, res: Response) {
  const request = await parseRequest(createUpdateCategorySchema, req, res);
  if (request === null) {
    return;
  }

  const result = await categoryRepository.create(request.body);

  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return res;
  }

  return res.status(200).json({ message: "Category successfully created" });
}

async function updateSingle(req: Request, res: Response) {
  const requestBody = await parseRequest(createUpdateCategorySchema, req, res);
  if (requestBody === null) {
    return;
  }

  const requestId = await parseRequest(idCategorySchema, req, res);
  if (requestId === null){
    return res;
  }

  const result = await categoryRepository.update(requestId.params.id, requestBody.body);
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return res;
  }

  return res.status(200).json({ message: "Category successfully updated" });
}

async function deleteSingle(req: Request, res: Response) {
  const request = await parseRequest(idCategorySchema, req, res);
  if (request === null){
    return;
  }

  const result = await categoryRepository.delete(request.params.id);
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return res;
  }

  return res.status(200).json({ message: "Category successfully deleted" });
}

export default {
  getAll,
  getSingle,
  createSingle,
  updateSingle,
  deleteSingle,
};
