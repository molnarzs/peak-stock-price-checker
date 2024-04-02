import { Injectable } from '@nestjs/common';
import { SchedulerRegistry, CronExpression } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { SymbolWatchService } from '../domain';

@Injectable()
export class CronSymbolWatchService implements SymbolWatchService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) { }

  async startWatching(symbol: string, command: VoidFunction): Promise<void> {
    const job = new CronJob(CronExpression.EVERY_MINUTE, async () => {
      command();
    });

    this.schedulerRegistry.addCronJob(symbol, job);
    job.start();

    console.log(`Watch for ${symbol} started`);
  }

  isWatching(symbol: string): Promise<boolean> {
    try {
      const job = this.schedulerRegistry.getCronJob(symbol);
      return Promise.resolve(!!job);
    } catch (error) {
      return Promise.resolve(false);
    }
  }
}
