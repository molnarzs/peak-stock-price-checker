import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectId } from 'typeorm';
import { StockPriceMovingAverage, StockPriceRepository } from '../domain';
import { StockPriceMovingAverageEntity } from './entities/stock-price-moving-average.entity';

@Injectable()
export class MongoStockPriceRepository implements StockPriceRepository {
  constructor(
    @InjectRepository(StockPriceMovingAverageEntity)
    private readonly repository: Repository<StockPriceMovingAverageEntity>,
  ) { }

  async getStockPriceMovingAverage(
    symbol: string,
  ): Promise<StockPriceMovingAverage | null> {
    const entity = await this.repository.findOne({
      where: {
        symbol,
      },
    });

    return entity ? entity.toModel() : null;
  }

  async saveStockPriceMovingAverage(
    stockPriceMovingAverage: StockPriceMovingAverage,
  ): Promise<void> {
    const entity = StockPriceMovingAverageEntity.fromModel(
      stockPriceMovingAverage,
    );

    await this.repository.save(entity);
  }
}
