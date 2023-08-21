import React from 'react';
import { LoadedState, TaxRatesResponse } from '../../data/model';
import styled from '@emotion/styled';
import { ResultSummary } from './ResultSummary';

export interface ResultPanelProps {
    grossIncome: number;
    taxRatesState: LoadedState<TaxRatesResponse>;
}

const Container = styled.div(() => ({
    width: '80%',
    border: '1px solid #000',
    minHeight: 500,
    borderRadius: 10,
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const ResultPanel: React.FC<ResultPanelProps> = ({
    grossIncome,
    taxRatesState,
}) => {
    const isLoading = taxRatesState.status === 'LOADING';
    const error =
        taxRatesState.status === 'ERROR' ? taxRatesState.error.message : null;
    const isSuccess = taxRatesState.status === 'SUCCESS';

    return (
        <Container>
            {isLoading && <p>Calculating...</p>}
            {error && <p>{error}</p>}
            {isSuccess && (
                <ResultSummary
                    grossIncome={grossIncome}
                    taxRatesResponse={taxRatesState.state}
                />
            )}
        </Container>
    );
};
