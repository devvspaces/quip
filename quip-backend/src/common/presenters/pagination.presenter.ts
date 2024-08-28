import { ApiResponseProperty } from '@nestjs/swagger';

export class PaginationPresenter<T> {
  @ApiResponseProperty()
  page: number;

  @ApiResponseProperty()
  pageSize: number;

  @ApiResponseProperty()
  total: number;

  @ApiResponseProperty()
  totalPages: number;

  @ApiResponseProperty()
  hasNext: boolean;

  @ApiResponseProperty()
  hasPrev: boolean;

  @ApiResponseProperty()
  data: T[];

  constructor(data: Partial<PaginationPresenter<T>>) {
    Object.assign(this, data);
  }
}
