import { PaginationPresenter } from '../presenters/pagination.presenter';

export function paginate<T>(
  total: number,
  limit: number,
  skip: number,
  data: T[],
): PaginationPresenter<T> {
  const totalPages = Math.ceil(total / limit);
  const hasNext = skip + limit < total;
  const hasPrev = skip > 0;
  const paginator = {
    page: Math.floor(skip / limit) + 1,
    pageSize: limit,
    total,
    totalPages,
    hasNext,
    hasPrev,
    data,
  };
  return new PaginationPresenter(paginator);
}
