import { render, screen } from '@testing-library/react';
import { App } from './app';
import React, { ReactElement } from 'react';
import { TaxCalculatorFormProps } from './components/tax-calculator-form/TaxCalculatorForm';
import { ResultPanelProps } from './components/result-panel/ResultPanel';
import { UseTaxCalculatorFormReturnType } from './components/tax-calculator-form/useTaxCalculatorForm';

// Mocking TaxCalculatorForm as TaxCalculatorForm component is tested in it's own spec file
const mockTaxCalcFormComponentFn = jest.fn();
jest.mock('./components/tax-calculator-form/TaxCalculatorForm', () => ({
    TaxCalculatorForm: (props: TaxCalculatorFormProps): ReactElement => {
        mockTaxCalcFormComponentFn(props);
        return <p>Mocked Tax Calculator Form</p>;
    },
}));

// Mocking ResultPanel as ResultPanel component is tested in it's own spec file
const mockResultPanelComponentFn = jest.fn();
jest.mock('./components/result-panel/ResultPanel', () => ({
    ResultPanel: (props: ResultPanelProps): ReactElement => {
        mockResultPanelComponentFn(props);
        return <p>Mocked Result Panel</p>;
    },
}));

const mockFormSubmitHandler = jest.fn();
const mockFormResetHandler = jest.fn();
jest.mock('./components/tax-calculator-form/useTaxCalculatorForm', () => ({
    useTaxCalculatorForm: (): UseTaxCalculatorFormReturnType => ({
        grossIncome: 0,
        taxRatesState: { status: 'NONE' },
        onFormSubmit: mockFormSubmitHandler,
        onFormReset: mockFormResetHandler,
    }),
}));

describe('App', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });
    it('should render', () => {
        // ARRANGE
        render(<App />);

        // ASSERT
        screen.getByText('Federal Tax Calculator - Canada');
        screen.getByText('Mocked Tax Calculator Form');
        screen.getByText('Mocked Result Panel');

        expect(mockTaxCalcFormComponentFn).toBeCalledWith(
            expect.objectContaining({
                onSubmit: mockFormSubmitHandler,
                onReset: mockFormResetHandler,
            })
        );
        expect(mockResultPanelComponentFn).toBeCalledWith(
            expect.objectContaining({
                grossIncome: 0,
                taxRatesState: { status: 'NONE' },
            })
        );
    });
});
