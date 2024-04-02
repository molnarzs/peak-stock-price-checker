import * as Joi from 'joi';

export type EnvironmentVariables = {
  HTTP_PORT: number;
  FINNHUB_API_KEY: string;
};

export const environmentVariablesSchema = Joi.object({
  HTTP_PORT: Joi.number().default(3000),
  FINNHUB_API_KEY: Joi.string().required(),
});
