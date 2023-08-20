import React from 'react';
import { InputLabel } from '../input-label/InputLabel';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    ref?: React.RefObject<HTMLInputElement>;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    ({ label, ...rest }, ref) => {
        return (
            <InputLabel label={label}>
                <input {...rest} ref={ref} />
            </InputLabel>
        );
    }
);
