import { TaxBracket, TaxBracketWithTax } from '../data/model';

export const calculateTotalTax = (taxBands: TaxBracketWithTax[]): number => {
    let result = 0;
    taxBands.forEach((tb) => (result += tb.tax));
    return result;
};

export const calculateAverageTaxRate = (
    grossIncome: number,
    totalTax: number
): number => {
    return grossIncome > 0
        ? parseFloat(((totalTax / grossIncome) * 100).toFixed(2))
        : 0;
};

const calculateTaxForBracket = (
    grossIncome: number,
    taxBracket: TaxBracket
): number => {
    const { min, max = grossIncome, rate } = taxBracket;
    if (grossIncome < min) {
        return 0;
    }
    return grossIncome >= max ? rate * (max - min) : rate * (grossIncome - min);
};

export const calculateTaxBands = (
    grossIncome: number,
    taxBrackets: TaxBracket[]
): TaxBracketWithTax[] => {
    const result: TaxBracketWithTax[] = [];
    taxBrackets.forEach((tb) => {
        const tax = calculateTaxForBracket(grossIncome, tb);
        if (tax > 0) {
            result.push({ ...tb, tax });
        }
    });
    return result;
};

export const calculateMarginalTaxRate = (
    grossIncome: number,
    taxBrackets: TaxBracket[]
): number => {
    const result = taxBrackets[0].rate;
    return parseFloat(
        (
            (taxBrackets.find(
                (tb) =>
                    grossIncome >= tb.min &&
                    grossIncome <= (tb.max ?? Number.POSITIVE_INFINITY)
            )?.rate ?? result) * 100
        ).toFixed(2)
    );
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
});

export const getCurrencyFormatter = () => currencyFormatter;
