export interface FieldError {
  [key: string]: string[];
}

export interface IFormatExceptionMessage {
  message: string;
  errors?: FieldError;
  code_error?: number;
}

export interface IException {
  badRequestException(data: IFormatExceptionMessage): void;
  internalServerErrorException(data?: IFormatExceptionMessage): void;
  forbiddenException(data?: IFormatExceptionMessage): void;
  unauthorizedException(data?: IFormatExceptionMessage): void;
  notFoundException(data: IFormatExceptionMessage): void;
  throwConflictRecord(data: IFormatExceptionMessage): void;
  throwNotAcceptable(data: IFormatExceptionMessage): void;
  throwUnprocessableInput(data: IFormatExceptionMessage): void;
}
