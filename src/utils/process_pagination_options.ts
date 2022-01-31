import { __DEFAULT_ITEMS_PER_PAGE__, __MAX_ITEMS_PER_PAGE__ } from "../constants";
import { CustomError, GeneralStatusCodes } from "../core/errors/CustomError";
import { IPaginationOptions } from "../types/pagination/IPaginationOptions";

interface IProcessPaginationResult {
  page: number;
  skip: number;
  take: number;
}

export const process_pagination_options = (options: IPaginationOptions = {}): IProcessPaginationResult => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || __DEFAULT_ITEMS_PER_PAGE__;

  if (limit > __MAX_ITEMS_PER_PAGE__) {
    throw new CustomError(
      GeneralStatusCodes.BadRequest,
      `You can have at most ${__MAX_ITEMS_PER_PAGE__} items per request.`
    );
  }

  const toSkip = (page - 1) * limit;
  return { page: page, skip: toSkip, take: limit };
};
