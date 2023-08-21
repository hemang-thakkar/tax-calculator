import { TaxBracketWithTax } from '../data/model';
import {
    calculateAverageTaxRate,
    calculateMarginalTaxRate,
    calculateTaxBands,
    calculateTotalTax,
} from './calculationMethods';

describe('Calculation Methods Unit test', () => {
    describe('calculateTotalTax', () => {
        it('should return expected total tax', () => {
            // ARRANGE
            const mockTaxBands: TaxBracketWithTax[] = [
                {
                    min: 0,
                    max: 10000,
                    rate: 0.15,
                    tax: 1500,
                },
                {
                    min: 10000,
                    max: 30000,
                    rate: 0.2,
                    tax: 4000,
                },
            ];
            // ACT
            const response = calculateTotalTax(mockTaxBands);
            // ASSERT
            expect(response).toBe(5500);
        });
        it('should return 0 for empty list of tax bands', () => {
            // ARRANGE
            const mockTaxBands: TaxBracketWithTax[] = [];
            // ACT
            const response = calculateTotalTax(mockTaxBands);
            // ASSERT
            expect(response).toBe(0);
        });
    });
    describe('calculateAverageTaxRate', () => {
        it('should return expected average tax rate', () => {
            // ARRANGE
            const totalTax = 4560;
            const grossIncome = 10000;
            // ACT
            const response = calculateAverageTaxRate(grossIncome, totalTax);
            // ASSERT
            expect(response).toBe(45.6);
        });
        it('should return 0 for grossIncome = 0', () => {
            // ARRANGE
            const totalTax = 0;
            const grossIncome = 0;
            // ACT
            const response = calculateAverageTaxRate(grossIncome, totalTax);
            // ASSERT
            expect(response).toBe(0);
        });
        it('should return 0 for totalTax = 0', () => {
            // ARRANGE
            const totalTax = 0;
            const grossIncome = 200;
            // ACT
            const response = calculateAverageTaxRate(grossIncome, totalTax);
            // ASSERT
            expect(response).toBe(0);
        });
    });
    describe('calculateTaxBands', () => {
        const taxBrackets = [
            {
                min: 0,
                max: 10000,
                rate: 0.15,
            },
            {
                min: 10000,
                max: 20000,
                rate: 0.2,
            },
            {
                min: 20000,
                max: 100000,
                rate: 0.25,
            },
            {
                min: 100000,
                max: 200000,
                rate: 0.27,
            },
            {
                min: 200000,
                rate: 0.33,
            },
        ];
        it('should return expected tax brackets with calculated tax for gross income = 200000', () => {
            // ARRANGE
            const grossIncome = 200000;
            const expectedResponse = [
                {
                    min: 0,
                    max: 10000,
                    rate: 0.15,
                    tax: 1500,
                },
                {
                    min: 10000,
                    max: 20000,
                    rate: 0.2,
                    tax: 2000,
                },
                {
                    min: 20000,
                    max: 100000,
                    rate: 0.25,
                    tax: 20000,
                },
                {
                    min: 100000,
                    max: 200000,
                    rate: 0.27,
                    tax: 27000,
                },
            ];
            // ACT
            const response = calculateTaxBands(grossIncome, taxBrackets);
            // ASSERT
            expect(response).toEqual(expectedResponse);
        });
        it('should return expected tax brackets with calculated tax for gross income = 300000', () => {
            // ARRANGE
            const grossIncome = 300000;

            const expectedResponse = [
                {
                    min: 0,
                    max: 10000,
                    rate: 0.15,
                    tax: 1500,
                },
                {
                    min: 10000,
                    max: 20000,
                    rate: 0.2,
                    tax: 2000,
                },
                {
                    min: 20000,
                    max: 100000,
                    rate: 0.25,
                    tax: 20000,
                },
                {
                    min: 100000,
                    max: 200000,
                    rate: 0.27,
                    tax: 27000,
                },
                {
                    min: 200000,
                    rate: 0.33,
                    tax: 33000,
                },
            ];
            // ACT
            const response = calculateTaxBands(grossIncome, taxBrackets);
            // ASSERT
            expect(response).toEqual(expectedResponse);
        });
        it('should return expected tax brackets with calculated tax for gross income = 0', () => {
            // ARRANGE
            const grossIncome = 0;
            // ACT
            const response = calculateTaxBands(grossIncome, taxBrackets);
            // ASSERT
            expect(response).toEqual([]);
        });
    });
    describe('calculateMarginalTaxRate', () => {
        const taxBrackets = [
            {
                min: 0,
                max: 10000,
                rate: 0.15,
            },
            {
                min: 10000,
                max: 20000,
                rate: 0.2,
            },
            {
                min: 20000,
                max: 100000,
                rate: 0.25,
            },
            {
                min: 100000,
                max: 200000,
                rate: 0.27,
            },
            {
                min: 200000,
                rate: 0.33,
            },
        ];
        it('should return expected marginal tax rate for gross income = 200000', () => {
            // ARRANGE
            const grossIncome = 200000;
            // ACT
            const response = calculateMarginalTaxRate(grossIncome, taxBrackets);
            // ASSERT
            expect(response).toEqual(27);
        });
        it('should return expected marginal tax rate for gross income = 300000', () => {
            // ARRANGE
            const grossIncome = 300000;
            // ACT
            const response = calculateMarginalTaxRate(grossIncome, taxBrackets);
            // ASSERT
            expect(response).toEqual(33);
        });
        it('should return expected marginal tax rate for gross income = 0', () => {
            // ARRANGE
            const grossIncome = 0;
            // ACT
            const response = calculateMarginalTaxRate(grossIncome, taxBrackets);
            // ASSERT
            expect(response).toEqual(15);
        });
    });
});
