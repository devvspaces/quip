import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ValidationError } from 'class-validator';
import { IFormatExceptionMessage } from '../exceptions/exceptions.interface';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  defaultNotFoundMessage = 'Resource not found';

  handleError(error: Error) {
    let response = null;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          if (error.meta && error.meta.target) {
            const target = error.meta.target;
            if (target[0]) {
              response = {
                status: HttpStatus.CONFLICT,
                message: `${target[0]} already exists`,
                code_err: 'P2002',
              };
              break;
            }
          } else {
            response = {
              status: HttpStatus.CONFLICT,
              message: 'Conflict',
              code_err: 'P2002',
            };
            break;
          }
          break;
        case 'P2023':
          response = {
            status: HttpStatus.NOT_ACCEPTABLE,
            message: 'Not acceptable',
            code_err: 'P2023',
          };
          break;
        case 'P2025':
          response = {
            message: this.defaultNotFoundMessage,
            status: HttpStatus.NOT_FOUND,
            code_err: 'P2025',
          };
          break;
        case 'P2009':
          response = {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            message: 'Unprocessable input',
            code_err: 'P2009',
          };
          break;
        default:
          response = {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            code_err: 'P2000',
          };
          break;
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      response = {
        message: this.defaultNotFoundMessage,
        status: HttpStatus.NOT_FOUND,
        code_err: null,
      };
    } else if (error instanceof NotFoundException) {
      response = {
        message:
          error.message === 'Not Found'
            ? this.defaultNotFoundMessage
            : error.message,
        status: HttpStatus.NOT_FOUND,
        code_err: null,
      };
    } else if (error instanceof HttpException) {
      const status = error.getStatus();
      const obj = error.getResponse() as IFormatExceptionMessage;
      response = {
        status,
        message: obj.message,
        code_err: obj.code_error,
        errors: obj.errors,
      };
    } else {
      console.log('error', typeof error);
      console.log('error', error);
      response = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        code_err: null,
      };
    }
    return response;
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: any = ctx.getRequest();

    const { status, message, code_err, errors } = this.handleError(exception);

    if (message instanceof Array) {
      if (message.length > 0) {
        if (message[0] instanceof ValidationError) {
          const messages = message as ValidationError[];
          const messageStrings = [];
          const errors = {};
          messages.forEach((error) => {
            const messageList = Object.values(error.constraints);
            messageStrings.push(...messageList);
            errors[error.property] = messageList;
          });

          this.logMessage(
            request,
            {
              message: messageStrings.join(', '),
              code_error: code_err,
              errors,
            },
            status,
            exception,
          );

          return response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: messageStrings,
            code_error: code_err,
            errors,
          });
        }
      }
    }

    const responseData = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      code_error: code_err,
      errors,
    };

    this.logMessage(
      request,
      {
        message,
        code_error: code_err,
        errors,
      },
      status,
      exception,
    );

    response.status(status).json(responseData);
  }

  private logMessage(
    request: any,
    message: IFormatExceptionMessage,
    status: number,
    exception: any,
  ) {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message.code_error ? message.code_error : null
        } message=${message.message ? message.message : null}`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message.code_error ? message.code_error : null
        } message=${message.message ? message.message : null}`,
      );
    }
  }
}
