import { ObjectId } from 'typeorm';

export class StockPriceMovingAverage {
  id?: ObjectId;
  symbol: string;
  lastPrices: number[];
  movingAverage: number;
  lastUpdated: Date;
}
