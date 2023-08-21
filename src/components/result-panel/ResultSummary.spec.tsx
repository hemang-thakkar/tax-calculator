import { render, screen, within } from '@testing-library/react';
import { ResultSummary } from './ResultSummary';
import React from 'react';

describe('Result Summary', () => {
    const mockTaxBrackets = [
        {
            min: 0,
            max: 10000,
            rate: 0.15,
        },
        {
            min: 10000,
            max: 20000,
            rate: 0.2,
        },
        {
            min: 20000,
            max: 100000,
            rate: 0.25,
        },
        {
            min: 100000,
            max: 200000,
            rate: 0.27,
        },
        {
            min: 200000,
            rate: 0.33,
        },
    ];
    it('should render applicable tax info for grossIncome 200000', () => {
        // ARRANGE
        render(
            <ResultSummary
                grossIncome={200000}
                taxRatesResponse={{ tax_brackets: mockTaxBrackets }}
            />
        );

        const taxBandElements = screen.getAllByTestId('tax-bands');

        // ASSERT
        screen.getByText('Tax Summary');
        within(taxBandElements[0]).getByText('CA$0.00 - CA$10,000.00');
        within(taxBandElements[0]).getByText('CA$1,500.00');

        within(taxBandElements[1]).getByText('CA$10,000.00 - CA$20,000.00');
        within(taxBandElements[1]).getByText('CA$2,000.00');

        within(taxBandElements[2]).getByText('CA$20,000.00 - CA$100,000.00');
        within(taxBandElements[2]).getByText('CA$20,000.00');

        within(taxBandElements[3]).getByText('CA$100,000.00 - CA$200,000.00');
        within(taxBandElements[3]).getByText('CA$27,000.00');

        screen.getByText('Total Tax');
        screen.getByText('CA$50,500.00');

        screen.getByText('Average Tax Rate');
        screen.getByText('25.25%');

        screen.getByText('Marginal Tax Rate');
        screen.getByText('27%');
    });

    it('should render applicable tax info for grossIncome 300000', () => {
        // ARRANGE
        render(
            <ResultSummary
                grossIncome={300000}
                taxRatesResponse={{ tax_brackets: mockTaxBrackets }}
            />
        );

        const taxBandElements = screen.getAllByTestId('tax-bands');

        // ASSERT
        screen.getByText('Tax Summary');
        within(taxBandElements[0]).getByText('CA$0.00 - CA$10,000.00');
        within(taxBandElements[0]).getByText('CA$1,500.00');

        within(taxBandElements[1]).getByText('CA$10,000.00 - CA$20,000.00');
        within(taxBandElements[1]).getByText('CA$2,000.00');

        within(taxBandElements[2]).getByText('CA$20,000.00 - CA$100,000.00');
        within(taxBandElements[2]).getByText('CA$20,000.00');

        within(taxBandElements[3]).getByText('CA$100,000.00 - CA$200,000.00');
        within(taxBandElements[3]).getByText('CA$27,000.00');

        within(taxBandElements[4]).getByText('> CA$200,000.00');
        within(taxBandElements[4]).getByText('CA$33,000.00');

        screen.getByText('Total Tax');
        screen.getByText('CA$83,500.00');

        screen.getByText('Average Tax Rate');
        screen.getByText('27.83%');

        screen.getByText('Marginal Tax Rate');
        screen.getByText('33%');
    });

    it('should render applicable tax info for grossIncome 0', () => {
        // ARRANGE
        render(
            <ResultSummary
                grossIncome={0}
                taxRatesResponse={{ tax_brackets: mockTaxBrackets }}
            />
        );

        const taxBandElements = screen.queryAllByTestId('tax-bands');

        // ASSERT
        screen.getByText('Tax Summary');
        expect(taxBandElements).toEqual([]);

        screen.getByText('Total Tax');
        screen.getByText('CA$0.00');

        screen.getByText('Average Tax Rate');
        screen.getByText('0%');

        screen.getByText('Marginal Tax Rate');
        screen.getByText('15%');
    });
});
