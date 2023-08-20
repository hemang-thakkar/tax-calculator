import styled from '@emotion/styled';
import React from 'react';

interface RowDisplayProps {
    title: string;
    value: string;
}

const Container = styled.div(() => ({
    fontWeight: 700,
    display: 'flex',
    justifyContent: 'space-between',
}));

export const RowDisplay: React.FC<RowDisplayProps> = ({ title, value }) => {
    return (
        <Container>
            <p>{title}</p>
            <p>{value}</p>
        </Container>
    );
};
