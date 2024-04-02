import { Module } from '@nestjs/common';
import { StockPriceUsecases } from './stock-price.usecases';
import { InfrastructureModule } from '../infrastructure';

@Module({
  imports: [InfrastructureModule],
  providers: [StockPriceUsecases],
  exports: [StockPriceUsecases],
})
export class UsecasesModule { }
