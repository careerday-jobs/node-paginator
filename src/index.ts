import { FilterQuery, Model, SortOrder } from 'mongoose';

import { validatePageValue } from './helpers/validatePageValue';
import { PaginatedResult } from './types/paginatedResult';

export interface OrQuery {
  [query: string]: {
    $regex: string;
    $options: string;
  };
}

export interface SortingOption {
  [key: string]: SortOrder | { $meta: 'textScore' };
}

export interface MongoosePaginationParam {
  pageNoParam: number;
  pageSizeParam: number;
  model: Model<any>;
  filteredFields: string[];
  filter?: string | null;
  orQuery?: OrQuery | null;
  andQuery?: FilterQuery<any> | null;
  sortingOption?: SortingOption | null;
  isNoMinResultLimit?: boolean;
}

export class NodePaginator {
  public static async paginateByMongoose<T>({
    pageNoParam,
    pageSizeParam,
    model,
    filteredFields = [],
    filter = null,
    orQuery = null,
    andQuery = null,
    sortingOption = { _id: -1 },
    isNoMinResultLimit = false,
  }: MongoosePaginationParam) {
    const { pageNo, pageSize } = validatePageValue(
      pageNoParam,
      pageSizeParam,
      isNoMinResultLimit
    );

    let query: FilterQuery<T> = {};
    let orFilters: OrQuery[] = [];

    if (!!filter) {
      orFilters = filteredFields.map((filteredField) => ({
        [filteredField]: {
          $regex: `${filter}`,
          $options: 'i',
        },
      }));
    }

    if (!!orQuery) {
      orFilters = [...orFilters, orQuery];
    }

    if (!!orFilters && orFilters.length > 0) {
      query = {
        ...query,
        $or: orFilters as FilterQuery<T>[],
      };
    }

    if (!!andQuery) {
      query = {
        ...query,
        ...andQuery,
      };
    }

    const queryResult = await model
      .find(query)
      .sort(sortingOption)
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .lean()
      .exec();

    const totalItemNo: number = await model.countDocuments(query);
    const totalPageNo: number = Math.ceil(totalItemNo / pageSize);

    const result = new PaginatedResult(
      Number(pageNo),
      Number(pageSize),
      Number(totalItemNo),
      Number(totalPageNo),
      queryResult
    );

    return result;
  }
}
