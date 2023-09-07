import { TaxRatesJSONResponse, TaxRatesResponse } from './model';

export const BASE_URL = 'http://localhost:5000/tax-calculator';

export const fetchTaxRates = async (
    taxYear: string
): Promise<TaxRatesResponse> => {
    const requestUrl = `${BASE_URL}/tax-year/${taxYear}`;

    try {
        const response = await fetch(requestUrl);
        const { tax_brackets }: TaxRatesJSONResponse = await response.json();

        if (response.ok && tax_brackets) {
            return { tax_brackets };
        } else {
            if (response.status === 404) {
                return Promise.reject(
                    new Error(
                        `Tax year (${taxYear}) is not supported. Please check your tax year.`
                    )
                );
            }
            return Promise.reject(
                new Error('Unknown Server Error. Please try again')
            );
        }
    } catch(err) {
        return Promise.reject(
            new Error('Unknown Server Error. Please try again')
        );
    }
};
