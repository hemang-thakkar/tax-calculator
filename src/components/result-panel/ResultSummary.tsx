import React from 'react';
import { TaxRatesResponse } from '../../data/model';
import styled from '@emotion/styled';
import {
    calculateAverageTaxRate,
    calculateMarginalTaxRate,
    calculateTaxBands,
    calculateTotalTax,
    getCurrencyFormatter,
} from '../../utils/calculationMethods';
import { TaxBand } from './TaxBand';
import { RowDisplay } from './RowDisplay';

export interface ResultSummaryProps {
    taxRatesResponse: TaxRatesResponse;
    grossIncome: number;
}

const Container = styled.div(() => ({
    width: '100%',
    flex: 1,
}));

const Header = styled.h3(() => ({}));

export const ResultSummary: React.FC<ResultSummaryProps> = ({
    grossIncome,
    taxRatesResponse,
}) => {
    const appliedTaxBrackets = calculateTaxBands(
        grossIncome,
        taxRatesResponse.tax_brackets
    );

    const totalTax = calculateTotalTax(appliedTaxBrackets);
    const averageTaxRate = calculateAverageTaxRate(grossIncome, totalTax);
    const marginalTaxRate = calculateMarginalTaxRate(
        grossIncome,
        taxRatesResponse.tax_brackets
    );

    const formatter = getCurrencyFormatter();

    return (
        <Container>
            <Header>Tax Summary</Header>
            {appliedTaxBrackets.length > 0 && <hr />}
            {appliedTaxBrackets.map((tb, index) => (
                <TaxBand testId="tax-bands" key={index} {...tb} />
            ))}
            <hr />
            <RowDisplay title="Total Tax" value={formatter.format(totalTax)} />
            <hr />
            <RowDisplay title="Average Tax Rate" value={`${averageTaxRate}%`} />
            <RowDisplay
                title="Marginal Tax Rate"
                value={`${marginalTaxRate}%`}
            />
        </Container>
    );
};
