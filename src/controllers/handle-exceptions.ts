import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodes } from '../domain';
import { ErrorResponseDto } from './dto/error.dto';

export const handleExceptions = (error: Error) => {
  switch (error.message) {
    case ErrorCodes.ALREADY_WATCHING_SYMBOL:
      throw new HttpException(
        new ErrorResponseDto(error.message, `Already watching symbol`),
        HttpStatus.CONFLICT,
      );
    case ErrorCodes.SYMBOL_DOES_NOT_EXIST:
      throw new HttpException(
        new ErrorResponseDto(error.message, `Symbol does not exist`),
        HttpStatus.NOT_FOUND,
      );
    case ErrorCodes.EXTERNAL_API_ERROR:
      throw new HttpException(
        new ErrorResponseDto(error.message, `External API error`),
        HttpStatus.NOT_FOUND,
      );
    case ErrorCodes.WATCH_NOT_STARTED:
      throw new HttpException(
        new ErrorResponseDto(error.message, `Stock price watch not started`),
        HttpStatus.NOT_FOUND,
      );
    case ErrorCodes.NO_DATA:
      throw new HttpException(
        new ErrorResponseDto(error.message, `No data fetched yet`),
        HttpStatus.NOT_FOUND,
      );
    default:
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
};
