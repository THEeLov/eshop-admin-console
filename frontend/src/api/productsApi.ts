import { Product, ProductEdit } from "../models/product";
import BaseApi from "./baseApi";
import { ReqPagination } from "../models/request";

const PRODUCTS_PREFIX = "/products";
const TYPE_EXTENDED = { type: "extended" };

async function getSingle(id: string) {
  return BaseApi.getSingle<Product>(`${PRODUCTS_PREFIX}/${id}`);
}

async function getAll() {
  return BaseApi.getAll<Product>(PRODUCTS_PREFIX);
}

async function getAllExtendedPaginated({ page }: ReqPagination) {
  return BaseApi.getAllPaginated<Product>(PRODUCTS_PREFIX, {
    params: { page, ...TYPE_EXTENDED },
  });
}

async function createSingle(payload: ProductEdit) {
  return BaseApi.postSingle<Product>(PRODUCTS_PREFIX, payload);
}

async function updateSingle(id: string, payload: ProductEdit) {
  return BaseApi.putSingle<Product>(`${PRODUCTS_PREFIX}/${id}`, payload);
}

async function deleteSingle(id: string) {
  return BaseApi.deleteSingle<Product>(`${PRODUCTS_PREFIX}/${id}`);
}

const ProductsApi = {
  getSingle,
  getAll,
  getAllExtendedPaginated,
  createSingle,
  updateSingle,
  deleteSingle,
};

export default ProductsApi;
