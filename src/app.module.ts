import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockPriceController } from './controllers';
import { UsecasesModule } from './use-cases/usecases.module';
import { ConfigService, InfrastructureModule } from './infrastructure';

@Module({
  imports: [
    UsecasesModule,
    InfrastructureModule,
    TypeOrmModule.forRootAsync({
      useClass: ConfigService,
    }),
  ],
  controllers: [StockPriceController],
})
export class AppModule {}
