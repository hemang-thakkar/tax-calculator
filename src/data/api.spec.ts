import {
    taxRates404HandlerException,
    taxRates500HandlerException,
} from '../../config/api-mocks/handlers';
import { mswServer } from '../../config/api-mocks/msw-server';
import { fetchTaxRates } from './api';
import { TaxRatesResponse } from './model';

describe('Api Tests', () => {
    it('should return valid tax rates', async () => {
        // ARRANGE
        const expectedResponse: TaxRatesResponse = {
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
        // ACT
        const response = await fetchTaxRates('2022');
        // ASSERT
        expect(response).toEqual(expectedResponse);
    });

    it('should handle 404 error', async () => {
        // ARRANGE
        mswServer.use(taxRates404HandlerException);
        // ASSERT
        await expect(fetchTaxRates('2023')).rejects.toEqual(
            new Error(
                `Tax year (2023) is not supported. Please check your tax year.`
            )
        );
    });

    it('should handle 500 error', async () => {
        // ARRANGE
        mswServer.use(taxRates500HandlerException);
        // ASSERT
        await expect(fetchTaxRates('2022')).rejects.toEqual(
            new Error('Unknown Server Error. Please try again')
        );
    });
});
