import path from 'path';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { StockPriceMovingAverageEntity } from '../entities/stock-price-moving-average.entity';

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: NestConfigService) { }

  get httpPort(): number {
    return Number.parseInt(
      this.configService.get('HTTP_PORT', { infer: true }),
    );
  }

  get finHubApiKey(): string {
    return this.configService.get('FINNHUB_API_KEY', { infer: true });
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      host: 'mongo',
      port: 27017,
      database: 'app',
      synchronize: true,
      entities: [StockPriceMovingAverageEntity],
    };
  }
}
