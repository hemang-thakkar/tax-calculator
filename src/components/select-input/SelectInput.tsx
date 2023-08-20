import React from 'react';
import { InputLabel } from '../input-label/InputLabel';

export interface SelectOption {
    value: string;
    label: string;
}

type SelectInputProps = React.InputHTMLAttributes<HTMLSelectElement> & {
    label: string;
    options: SelectOption[];
    ref?: React.RefObject<HTMLSelectElement>;
};

export const SelectInput = React.forwardRef<
    HTMLSelectElement,
    SelectInputProps
>(({ label, options, ...rest }, ref) => {
    return (
        <InputLabel label={label}>
            <select {...rest} ref={ref}>
                {options.map((option) => (
                    <option key={option.label} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </InputLabel>
    );
});
