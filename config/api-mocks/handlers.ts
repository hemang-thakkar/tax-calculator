import { rest } from 'msw';
import { BASE_URL } from '../../src/data/api';
import { TaxRatesResponse } from '../../src/data/model';

export const mockTaxRatesResponse: TaxRatesResponse = {
    tax_brackets: [
        {
            min: 0,
            max: 50197,
            rate: 0.15,
        },
        {
            min: 50197,
            max: 100392,
            rate: 0.205,
        },
        {
            min: 100392,
            max: 155625,
            rate: 0.26,
        },
        {
            min: 155625,
            max: 221708,
            rate: 0.29,
        },
        {
            min: 221708,
            rate: 0.33,
        },
    ],
};

const getTaxRatesPath = `${BASE_URL}/tax-year/:taxYear`;

const tasksHandler = rest.get(getTaxRatesPath, async (req, res, ctx) =>
    res(ctx.json(mockTaxRatesResponse))
);

export const taxRates500HandlerException = rest.get(
    getTaxRatesPath,
    async (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ message: 'Internal server error' }))
);

export const taxRates404HandlerException = rest.get(
    getTaxRatesPath,
    async (req, res, ctx) =>
        res(ctx.status(404), ctx.json({ message: 'URL not found' }))
);

export const handlers = [tasksHandler];
