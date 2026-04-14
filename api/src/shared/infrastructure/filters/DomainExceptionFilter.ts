import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '@/shared/domain/errors/DomainError';
import { UserAlreadyExistsError } from '@/account/domain/errors/UserAlreadyExistsError';
import { InvalidCredentialsError } from '@/account/domain/errors/InvalidCredentialsError';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.BAD_REQUEST; // Default code for domain mapping

    if (exception instanceof UserAlreadyExistsError) {
      status = HttpStatus.CONFLICT;
    } else if (exception instanceof InvalidCredentialsError) {
      status = HttpStatus.UNAUTHORIZED;
    }

    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: exception.message,
    });
  }
}
