import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaxCalculatorForm } from './TaxCalculatorForm';
import React from 'react';

describe('TaxCalculatorForm', () => {
    const mockFormSubmitHandler = jest.fn();
    const mockFormResetHandler = jest.fn();
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('should render form', () => {
        // ARRANGE
        render(
            <TaxCalculatorForm
                onSubmit={mockFormSubmitHandler}
                onReset={mockFormResetHandler}
            />
        );

        // ASSERT
        screen.getByLabelText('Gross Income');
        screen.getByLabelText('Tax Year');
        screen.getByText('Calculate');
        screen.getByText('Reset');
    });

    it('should not call onFormSubmit if grossIncome and taxYear are empty', () => {
        // ARRANGE
        render(
            <TaxCalculatorForm
                onSubmit={mockFormSubmitHandler}
                onReset={mockFormResetHandler}
            />
        );

        // ACT
        userEvent.click(screen.getByText('Calculate'));

        // ASSERT
        expect(mockFormSubmitHandler).not.toBeCalled();
    });

    it('should not call onFormSubmit if grossIncome is empty', async () => {
        // ARRANGE
        render(
            <TaxCalculatorForm
                onSubmit={mockFormSubmitHandler}
                onReset={mockFormResetHandler}
            />
        );

        // ACT
        await userEvent.type(screen.getByLabelText('Tax Year'), '2022');
        await userEvent.click(screen.getByText('Calculate'));

        // ASSERT
        expect(mockFormSubmitHandler).not.toBeCalled();
    });

    it('should not call onFormSubmit if taxYear is empty', async () => {
        // ARRANGE
        render(
            <TaxCalculatorForm
                onSubmit={mockFormSubmitHandler}
                onReset={mockFormResetHandler}
            />
        );

        // ACT
        await userEvent.type(screen.getByLabelText('Gross Income'), '50000');
        await userEvent.click(screen.getByText('Calculate'));

        // ASSERT
        expect(mockFormSubmitHandler).not.toBeCalled();
    });

    it('should call onFormSubmit if taxYear and grossIncome are provided', async () => {
        // ARRANGE
        render(
            <TaxCalculatorForm
                onSubmit={mockFormSubmitHandler}
                onReset={mockFormResetHandler}
            />
        );

        // ACT
        await userEvent.type(screen.getByLabelText('Gross Income'), '50000');
        await userEvent.type(screen.getByLabelText('Tax Year'), '2022');
        await userEvent.click(screen.getByText('Calculate'));

        // ASSERT
        expect(mockFormSubmitHandler).toBeCalledWith({
            grossIncome: '50000',
            taxYear: '2022',
        });
    });

    it('should call onReset when Reset is clicked', async () => {
        // ARRANGE
        render(
            <TaxCalculatorForm
                onSubmit={mockFormSubmitHandler}
                onReset={mockFormResetHandler}
            />
        );

        // ACT
        await userEvent.click(screen.getByText('Reset'));

        // ASSERT
        expect(mockFormResetHandler).toBeCalled();
    });
});
