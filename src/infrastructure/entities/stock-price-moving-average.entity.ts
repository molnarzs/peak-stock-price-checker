import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';
import { StockPriceMovingAverage } from '../../domain';

@Entity()
export class StockPriceMovingAverageEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  symbol: string;

  @Column()
  lastPrices: number[];

  @Column()
  movingAverage: number;

  @Column()
  lastUpdated: Date;

  toModel(): StockPriceMovingAverage {
    const model = new StockPriceMovingAverage();
    model.symbol = this.symbol;
    model.movingAverage = this.movingAverage;
    model.lastUpdated = this.lastUpdated;
    model.lastPrices = this.lastPrices;
    model.id = this.id;

    return model;
  }

  static fromModel(
    model: StockPriceMovingAverage,
  ): StockPriceMovingAverageEntity {
    const entity = new StockPriceMovingAverageEntity();

    entity.symbol = model.symbol;
    entity.movingAverage = model.movingAverage;
    entity.lastUpdated = model.lastUpdated;
    entity.lastPrices = model.lastPrices;
    entity.id = model.id;

    return entity;
  }
}
