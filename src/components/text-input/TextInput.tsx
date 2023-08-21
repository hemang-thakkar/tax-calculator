import React from 'react';
import { InputLabel } from '../input-label/InputLabel';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    ref?: React.RefObject<HTMLInputElement>;
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    ({ label, ...rest }, ref) => {
        return (
            <InputLabel label={label}>
                <input {...rest} ref={ref} />
            </InputLabel>
        );
    }
);

TextInput.displayName = "TextInput";
export default TextInput;
