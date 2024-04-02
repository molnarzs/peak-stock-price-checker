import { Controller, Get, Param, Put } from '@nestjs/common';
import { StockPriceUsecases } from '../use-cases';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { handleExceptions } from './handle-exceptions';
import { GetCurrentMovingAverageResponseDTO } from './dto/current-moving-average.dto';
import { ErrorResponseDto } from './dto/error.dto';

@Controller('/stock')
@ApiTags('stock-price')
export class StockPriceController {
  constructor(private readonly stockPriceUsecases: StockPriceUsecases) {}

  @Get(':symbol')
  @ApiOkResponse({
    type: GetCurrentMovingAverageResponseDTO,
    description: 'Get current stock price with moving average',
  })
  @ApiNotFoundResponse({
    type: ErrorResponseDto,
    description: 'Symbol not found',
  })
  @ApiConflictResponse({
    type: ErrorResponseDto,
    description:
      'Watch for symbol is not started. Start the watch with PUT /stock/:symbol to get the moving average as well.',
  })
  async getCurrentStockPrice(
    @Param('symbol') symbol: string,
  ): Promise<GetCurrentMovingAverageResponseDTO> {
    try {
      const movingAverage =
        await this.stockPriceUsecases.getCurrentMovingAverage(symbol);
      return GetCurrentMovingAverageResponseDTO.fromModel(movingAverage);
    } catch (error) {
      handleExceptions(error);
    }
  }

  @Put(':symbol')
  @ApiOkResponse({
    type: ErrorResponseDto,
    description: 'Get current stock price with moving average',
  })
  @ApiNotFoundResponse({
    type: ErrorResponseDto,
    description: 'Symbol not found',
  })
  @ApiConflictResponse({
    type: ErrorResponseDto,
    description: 'Stock price watch already started',
  })
  async startWatchingStock(@Param('symbol') symbol: string): Promise<void> {
    try {
      await this.stockPriceUsecases.startWatchingStock(symbol);
    } catch (error) {
      handleExceptions(error);
    }
  }
}
