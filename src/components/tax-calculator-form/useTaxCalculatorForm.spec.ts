import { act, renderHook, waitFor } from '@testing-library/react';
import { useTaxCalculatorForm } from './useTaxCalculatorForm';
import { TaxRatesResponse } from '../../data/model';
import { mswServer } from '../../../config/api-mocks/msw-server';
import { taxRates404HandlerException } from '../../../config/api-mocks/handlers';

describe('useTaxCalculatorForm', () => {
    it('should return grossIncome as 0, taxRatesState as NONE and form handlers', () => {
        // ARRANGE
        const { result } = renderHook(() => useTaxCalculatorForm());

        // ASSERT
        expect(result.current.grossIncome).toEqual(0);
        expect(result.current.taxRatesState).toEqual({ status: 'NONE' });
        expect(result.current.onFormSubmit).toBeDefined();
        expect(result.current.onFormReset).toBeDefined();
    });

    it('should set grossIncome to passed in value, taxRatesState as LOADING', () => {
        // ARRANGE
        const { result } = renderHook(() => useTaxCalculatorForm());

        // ACT
        act(() => {
            result.current.onFormSubmit({
                grossIncome: '50000',
                taxYear: '2020',
            });
        });

        // ASSERT
        expect(result.current.grossIncome).toEqual(50000);
        expect(result.current.taxRatesState).toEqual({
            status: 'LOADING',
            state: null,
        });
    });

    it('should set taxRatesState as SUCCESS', async () => {
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
        const { result } = renderHook(() => useTaxCalculatorForm());

        // ACT
        act(() => {
            result.current.onFormSubmit({
                grossIncome: '50000',
                taxYear: '2020',
            });
        });

        // ASSERT
        await waitFor(() => expect(result.current.grossIncome).toEqual(50000));
        await waitFor(() =>
            expect(result.current.taxRatesState).toEqual({
                status: 'SUCCESS',
                state: expectedResponse,
            })
        );
    });

    it('should set taxRatesState as ERROR', async () => {
        // ARRANGE
        mswServer.use(taxRates404HandlerException);
        const { result } = renderHook(() => useTaxCalculatorForm());

        // ACT
        act(() => {
            result.current.onFormSubmit({
                grossIncome: '50000',
                taxYear: '2020',
            });
        });

        // ASSERT
        await waitFor(() => expect(result.current.grossIncome).toEqual(50000));
        await waitFor(() =>
            expect(result.current.taxRatesState).toEqual({
                status: 'ERROR',
                state: null,
                error: new Error(
                    `Tax year (2020) is not supported. Please check your tax year.`
                ),
            })
        );
    });

    it('should reset grossIncome to 0 and taxRatesState as NONE', async () => {
        // ARRANGE
        mswServer.use(taxRates404HandlerException);
        const { result } = renderHook(() => useTaxCalculatorForm());

        // ACT
        act(() => {
            result.current.onFormSubmit({
                grossIncome: '50000',
                taxYear: '2020',
            });
        });

        // ASSERT
        await waitFor(() => expect(result.current.grossIncome).toEqual(50000));
        await waitFor(() =>
            expect(result.current.taxRatesState).toEqual({
                status: 'ERROR',
                state: null,
                error: new Error(
                    `Tax year (2020) is not supported. Please check your tax year.`
                ),
            })
        );

        // RESET
        act(() => {
            result.current.onFormReset();
        });
        expect(result.current.grossIncome).toEqual(0);
        expect(result.current.taxRatesState).toEqual({ status: 'NONE' });
    });
});
