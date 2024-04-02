import { ApiProperty } from '@nestjs/swagger';
import { ErrorCodes } from '../../domain';

export class ErrorResponseDto {
  constructor(errorCode: ErrorCodes, description?: string) {
    this.errorCode = errorCode;
    this.description = description;
  }

  @ApiProperty()
  errorCode: ErrorCodes;

  @ApiProperty()
  description?: string;
}
