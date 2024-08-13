export type BaseModelId = {
  id: string;
};

export type BaseModelTimestamps = {
  createdOn: string;
  updatedOn: string;
};

export type DateModelTimestamps = {
  createdOn: Date;
  updatedOn: Date;
};

export type ApiRespMulti<T> = {
  items: T[];
  message?: string;
};

export type ApiRespMultiPaginated<T> = ApiRespMulti<T> & {
  pagination: Pagination;
};

export type ApiRespSingle<T> = {
  item: T;
  message?: string;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
};

export type PaginationQuery = {
  page?: number | undefined;
  type?: string | undefined;
};
