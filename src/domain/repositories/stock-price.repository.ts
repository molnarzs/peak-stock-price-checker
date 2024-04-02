import { StockPriceMovingAverage } from '../models/stock-price-moving-average.model';

export abstract class StockPriceRepository {
  abstract getStockPriceMovingAverage(
    symbol: string,
  ): Promise<StockPriceMovingAverage | null>;

  abstract saveStockPriceMovingAverage(
    stockPriceMovingAverage: StockPriceMovingAverage,
  ): Promise<void>;
}
