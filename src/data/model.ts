export interface TaxBracket {
    min: number;
    max?: number;
    rate: number;
}

export interface TaxRatesResponse {
    tax_brackets: TaxBracket[];
}

export type TaxRatesJSONResponse = Partial<TaxRatesResponse> & {
    errors: Error[];
};

export interface NoneState {
    status: 'NONE';
}

export interface LoadingState<T> {
    status: 'LOADING';
    state: T | null;
}

export interface SuccessState<T> {
    status: 'SUCCESS';
    state: T;
}

export interface ErrorState {
    status: 'ERROR';
    state: null;
    error: Error;
}

export type LoadedState<T> =
    | NoneState
    | LoadingState<T>
    | SuccessState<T>
    | ErrorState;

export type TaxBracketWithTax = TaxBracket & {
    tax: number;
};
