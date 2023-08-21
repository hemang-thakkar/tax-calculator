import { render, screen } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { ResultPanel } from './ResultPanel';
import { mockTaxRatesResponse } from '../../../config/api-mocks/handlers';
import { ResultSummaryProps } from './ResultSummary';

// Mocking ResultSummary as ResultSummary component is tested in it's own spec file
const mockComponentFn = jest.fn();
jest.mock('./ResultSummary', () => ({
    ResultSummary: (props: ResultSummaryProps): ReactElement => {
        mockComponentFn(props);
        return <p>Result Summary</p>;
    },
}));

describe('Result Panel', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should render loading scenario', () => {
        // ACT
        render(
            <ResultPanel
                grossIncome={50000}
                taxRatesState={{ status: 'LOADING', state: null }}
            />
        );

        // ASSERT
        screen.getByText('Calculating...');
    });

    it('should render error scenario', () => {
        // ACT
        render(
            <ResultPanel
                grossIncome={50000}
                taxRatesState={{
                    status: 'ERROR',
                    state: null,
                    error: new Error('Mock Error'),
                }}
            />
        );

        // ASSERT
        screen.getByText('Mock Error');
    });

    it('should render success scenario', () => {
        // ACT
        render(
            <ResultPanel
                grossIncome={50000}
                taxRatesState={{
                    status: 'SUCCESS',
                    state: mockTaxRatesResponse,
                }}
            />
        );

        // ASSERT
        screen.getByText('Result Summary');
        expect(mockComponentFn).toHaveBeenCalledWith(
            expect.objectContaining({
                grossIncome: 50000,
                taxRatesResponse: mockTaxRatesResponse,
            })
        );
    });
});
