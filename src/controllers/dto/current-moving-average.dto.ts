import { ApiProperty } from '@nestjs/swagger';
import { ErrorResponseDto } from './error.dto';
import { StockPriceMovingAverage } from '../../domain';

export class GetCurrentMovingAverageResponseDTO {
  @ApiProperty()
  currentPrice: number;

  @ApiProperty()
  movingAverage: number;

  @ApiProperty()
  lastUpdated: Date;

  static fromModel(
    model: StockPriceMovingAverage,
  ): GetCurrentMovingAverageResponseDTO {
    return {
      movingAverage: model.movingAverage,
      currentPrice: model.lastPrices[model.lastPrices.length - 1],
      lastUpdated: model.lastUpdated,
    };
  }
}
