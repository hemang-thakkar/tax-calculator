import React from 'react';
import { TaxBracketWithTax } from '../../data/model';
import styled from '@emotion/styled';
import { getCurrencyFormatter } from '../../utils/calculationMethods';

type TaxBandProps = TaxBracketWithTax;

const Container = styled.div(() => ({
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const TaxBand: React.FC<TaxBandProps> = ({ min, max, tax }) => {
    const currencyFormatter = getCurrencyFormatter();

    const bandTitle = max
        ? `${currencyFormatter.format(min)} - ${currencyFormatter.format(max)}`
        : `${currencyFormatter.format(min)}`;

    return (
        <Container>
            <p>{bandTitle}</p>
            <p>{`${currencyFormatter.format(tax)}`}</p>
        </Container>
    );
};
