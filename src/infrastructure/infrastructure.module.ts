import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  QuoteRepository,
  StockPriceRepository,
  SymbolWatchService,
} from '../domain';
import { FinnhubQuoteRepository } from './finnhub-quote.repository';
import { environmentVariablesSchema } from './config/config.schema';
import { CronSymbolWatchService } from './cron-symbol-watch.service';
import { StockPriceMovingAverageEntity } from './entities/stock-price-moving-average.entity';
import { MongoStockPriceRepository } from './mongo-stock-price.repository';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema: environmentVariablesSchema,
    }),
    TypeOrmModule.forFeature([StockPriceMovingAverageEntity]),
  ],
  providers: [
    ConfigService,
    {
      provide: QuoteRepository,
      useClass: FinnhubQuoteRepository,
    },
    {
      provide: SymbolWatchService,
      useClass: CronSymbolWatchService,
    },
    {
      provide: StockPriceRepository,
      useClass: MongoStockPriceRepository,
    },
  ],
  exports: [
    ConfigService,
    QuoteRepository,
    SymbolWatchService,
    StockPriceRepository,
  ],
})
export class InfrastructureModule { }
