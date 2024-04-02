import { ErrorCodes } from '../errors';

export abstract class QuoteRepository {
  abstract getQuote(symbol: string): Promise<number>;
  abstract symbolExists(symbol: string): Promise<boolean>;
}
