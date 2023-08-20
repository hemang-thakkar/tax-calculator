import React from 'react';
import styled from '@emotion/styled';

type InputLabelProps = React.InputHTMLAttributes<HTMLLabelElement> & {
    label: string;
};

const Label = styled.label(() => ({
    display: 'block',
}));

const LabelSpan = styled.span(() => ({
    marginRight: 10,
}));

export const InputLabel: React.FC<InputLabelProps> = ({ label, children }) => {
    return (
        <Label>
            <LabelSpan>{label}</LabelSpan>
            {children}
        </Label>
    );
};
