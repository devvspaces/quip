import { Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common/decorators';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationPresenter } from '../presenters/pagination.presenter';

/**
 * Decorator for paginated response
 * @param model Model to be paginated
 * @param description Description of the response
 */
export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  description?: string,
) => {
  return applyDecorators(
    ApiExtraModels(PaginationPresenter, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginationPresenter) },
          {
            properties: {
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
      description,
    }),
  );
};
