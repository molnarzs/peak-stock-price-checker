import { Inject, Injectable } from '@nestjs/common';
import {
  CurrentStockPrice,
  QuoteRepository,
  StockPriceMovingAverage,
  StockPriceRepository,
  SymbolWatchService,
  ErrorCodes,
} from '../domain';

@Injectable()
export class StockPriceUsecases {
  constructor(
    @Inject(QuoteRepository)
    private readonly quoteRepository: QuoteRepository,
    @Inject(SymbolWatchService)
    private readonly symbolWatchService: SymbolWatchService,
    @Inject(StockPriceRepository)
    private readonly stockPriceRepository: StockPriceRepository,
  ) { }

  async getCurrentQuote(symbol: string): Promise<CurrentStockPrice> {
    const quote = await this.quoteRepository.getQuote(symbol);

    return {
      symbol,
      currentPrice: quote,
    };
  }

  async getCurrentMovingAverage(
    symbol: string,
  ): Promise<StockPriceMovingAverage> {
    const isWatching = await this.symbolWatchService.isWatching(symbol);

    if (!isWatching) {
      throw new Error(ErrorCodes.WATCH_NOT_STARTED);
    }

    const entity =
      await this.stockPriceRepository.getStockPriceMovingAverage(symbol);

    if (!entity) {
      throw new Error(ErrorCodes.NO_DATA);
    }

    return entity;
  }

  async startWatchingStock(symbol: string): Promise<void> {
    const isWatching = await this.symbolWatchService.isWatching(symbol);

    if (isWatching) {
      throw new Error(ErrorCodes.ALREADY_WATCHING_SYMBOL);
    }

    const symbolExists = await this.quoteRepository.symbolExists(symbol);

    if (!symbolExists) {
      throw new Error(ErrorCodes.SYMBOL_DOES_NOT_EXIST);
    }

    await this.symbolWatchService.startWatching(symbol, () =>
      this.updateMovingAverage(symbol),
    );
  }

  async updateMovingAverage(symbol: string): Promise<void> {
    try {
      const entity =
        await this.stockPriceRepository.getStockPriceMovingAverage(symbol);

      const currentQuote = await this.getCurrentQuote(symbol);

      const updated = this._updateMovingAverage(
        entity,
        symbol,
        currentQuote.currentPrice,
      );

      await this.stockPriceRepository.saveStockPriceMovingAverage(updated);
    } catch (error) {
      console.error('Error updating moving average: ', error);
    }
  }

  private _updateMovingAverage(
    current: StockPriceMovingAverage | null,
    symbol: string,
    quote: number,
  ) {
    let lastPrices = [quote];

    if (!!current?.lastPrices) {
      if (current.lastPrices.length >= 10) {
        lastPrices = [...current.lastPrices.slice(1, 10), quote];
      } else {
        lastPrices = [...current.lastPrices, quote];
      }
    }

    const movingAverage =
      lastPrices.reduce((acc, price) => acc + price, 0) / lastPrices.length;

    return {
      id: current?.id,
      symbol,
      lastPrices,
      movingAverage,
      lastUpdated: new Date(),
    };
  }
}
