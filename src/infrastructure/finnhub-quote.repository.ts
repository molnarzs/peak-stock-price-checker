import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';
import { DefaultApi, Quote, StockSymbol } from 'finnhub-ts';
import { ConfigService } from './config/config.service';
import * as R from 'ramda';
import { ErrorCodes, QuoteRepository } from '../domain';

@Injectable()
export class FinnhubQuoteRepository implements QuoteRepository {
  private finnhubClient: DefaultApi;

  constructor(configService: ConfigService) {
    this.finnhubClient = new DefaultApi({
      apiKey: configService.finHubApiKey,
      isJsonMime: (input) => {
        try {
          JSON.parse(input);
          return true;
        } catch (error) { }
        return false;
      },
    });
  }

  async getQuote(symbol: string): Promise<number> {
    const { data: quote } = await this.finnhubClient.quote(symbol);

    if (!this._symbolExists(quote)) {
      throw new Error(ErrorCodes.SYMBOL_DOES_NOT_EXIST);
    }

    if (!quote?.c) {
      throw new Error(ErrorCodes.EXTERNAL_API_ERROR);
    }

    return quote.c;
  }

  async symbolExists(symbol: string): Promise<boolean> {
    // Check the US symbols only. More country codes can be added if needed.
    const { data } = await this.finnhubClient.stockSymbols('US');

    const apiResponseSchema = Joi.array()
      .items(
        Joi.object({
          symbol: Joi.string().required(),
        }).unknown(),
      )
      .required();

    const { error: validationError, value: validatedData } =
      apiResponseSchema.validate(data);

    if (validationError) {
      console.error('Invalid API response: ', validationError);
      throw new Error(ErrorCodes.EXTERNAL_API_ERROR);
    }

    const symbols = validatedData.map((symbol: StockSymbol) => symbol.symbol);

    return symbols.includes(symbol);
  }

  private _symbolExists(quote: Quote) {
    const notExistingSymbolResponse = {
      c: 0,
      d: null,
      dp: null,
      h: 0,
      l: 0,
      o: 0,
      pc: 0,
      t: 0,
    };

    return !R.equals(quote, notExistingSymbolResponse);
  }
}
