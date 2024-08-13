import BaseApi from "./baseApi";
import { Category, CategoryBasic, CategoryEdit } from "../models/category";
import { ReqPagination } from "../models/request";

const CATEGORIES_PREFIX = "/categories";
const TYPE_BASIC = { type: "basic" };

async function getSingle(id: string) {
  return BaseApi.getSingle<Category>(`${CATEGORIES_PREFIX}/${id}`);
}

async function getAll() {
  return BaseApi.getAll<Category>(CATEGORIES_PREFIX);
}

async function getAllBasic() {
  return BaseApi.getAll<CategoryBasic>(CATEGORIES_PREFIX, {
    params: TYPE_BASIC,
  });
}

async function getAllPaginated({ page }: ReqPagination) {
  return BaseApi.getAllPaginated<Category>(CATEGORIES_PREFIX, {
    params: { page },
  });
}

async function createSingle(payload: CategoryEdit) {
  return BaseApi.postSingle<Category>(CATEGORIES_PREFIX, payload);
}

async function updateSingle(id: string, payload: CategoryEdit) {
  return BaseApi.putSingle<Category>(`${CATEGORIES_PREFIX}/${id}`, payload);
}

async function deleteSingle(id: string) {
  return BaseApi.deleteSingle<Category>(`${CATEGORIES_PREFIX}/${id}`);
}

const CategoriesApi = {
  getSingle,
  getAll,
  getAllBasic,
  getAllPaginated,
  createSingle,
  updateSingle,
  deleteSingle,
};

export default CategoriesApi;
