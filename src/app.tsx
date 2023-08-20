import React from 'react';
import styled from '@emotion/styled';
import { TaxCalculatorForm } from './components/tax-calculator-form/TaxCalculatorForm';
import { ResultPanel } from './components/result-panel/ResultPanel';
import { useTaxCalculatorForm } from './components/tax-calculator-form/useTaxCalculatorForm';

const Container = styled.div(() => ({
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: 24,
}));

const Header = styled.h2(() => ({}));

export const App = () => {
    const { taxRatesState, grossIncome, onFormSubmit, onFormReset } =
        useTaxCalculatorForm();

    return (
        <Container>
            <Header>Federal Tax Calculator - Canada</Header>
            <TaxCalculatorForm onSubmit={onFormSubmit} onReset={onFormReset} />
            <ResultPanel
                taxRatesState={taxRatesState}
                grossIncome={grossIncome}
            />
        </Container>
    );
};
