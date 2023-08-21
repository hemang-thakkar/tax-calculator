import React from 'react';
import { LoadedState, TaxRatesResponse } from '../../data/model';
import { OnSubmitArgs } from './TaxCalculatorForm';
import { fetchTaxRates } from '../../data/api';

export interface UseTaxCalculatorFormReturnType {
    taxRatesState: LoadedState<TaxRatesResponse>;
    grossIncome: number;
    onFormSubmit: (args: OnSubmitArgs) => void;
    onFormReset: () => void;
}

export function useTaxCalculatorForm(): UseTaxCalculatorFormReturnType {
    const [taxRatesState, setTaxRatesState] = React.useState<
        LoadedState<TaxRatesResponse>
    >({ status: 'NONE' });
    const [grossIncome, setGrossIncome] = React.useState<number>(0);

    const onFormSubmit = ({ grossIncome, taxYear: year }: OnSubmitArgs) => {
        setGrossIncome(parseFloat(grossIncome));
        setTaxRatesState({ status: 'LOADING', state: null });
        fetchTaxRates(year)
            .then((response) => {
                setTaxRatesState({ status: 'SUCCESS', state: response });
            })
            .catch((err) => {
                setTaxRatesState({ status: 'ERROR', state: null, error: err });
            });
    };

    const onFormReset = () => {
        setGrossIncome(0);
        setTaxRatesState({ status: 'NONE' });
    };

    return { taxRatesState, grossIncome, onFormSubmit, onFormReset };
}
