import React, { FormEvent, FormEventHandler } from 'react';
import { TextInput } from '../text-input/TextInput';
import { SelectInput, SelectOption } from '../select-input/SelectInput';
import { TAX_YEAR_OPTIONS } from '../../utils/constants';
import styled from '@emotion/styled';

const PLACEHOLDER_OPTION: SelectOption = {
    value: '',
    label: 'Select Tax Year',
};

export interface OnSubmitArgs {
    grossIncome: string;
    taxYear: string;
}

export interface TaxCalculatorFormProps {
    onSubmit: (args: OnSubmitArgs) => void;
    onReset: () => void;
}

const Form = styled.form(() => ({
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'center',
    width: '80%',
    border: '1px solid #000',
    borderRadius: 5,
    padding: 25,
}));

export const TaxCalculatorForm: React.FC<TaxCalculatorFormProps> = ({
    onReset,
    onSubmit,
}) => {
    const incomeRef = React.useRef<HTMLInputElement>(null);
    const taxYearRef = React.useRef<HTMLInputElement>(null);
    // const taxYearRef = React.useRef<HTMLSelectElement>(null);

    const options = [PLACEHOLDER_OPTION, ...TAX_YEAR_OPTIONS];

    const onSubmitHandler: FormEventHandler<HTMLFormElement> = (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const grossIncome = incomeRef.current?.value;
        const taxYear = taxYearRef.current?.value;

        if (grossIncome && taxYear) {
            onSubmit({ grossIncome, taxYear });
        }
    };

    const onResetHandler: FormEventHandler<HTMLFormElement> = (
        e: FormEvent<HTMLFormElement>
    ) => {
        onReset();
    };

    return (
        <Form onSubmit={onSubmitHandler} onReset={onResetHandler}>
            <TextInput
                type="number"
                label="Gross Income"
                name="grossIncome"
                placeholder="Enter gross income"
                ref={incomeRef}
            />
            <TextInput
                type="number"
                label="Tax Year"
                name="taxYear"
                placeholder="Enter tax year"
                ref={taxYearRef}
            />
            {/* <SelectInput label="Tax Year" options={options} name="taxYear" ref={taxYearRef}/> */}
            <input type="submit" value="Calculate" />
            <input type="reset" value="Reset" />
        </Form>
    );
};
