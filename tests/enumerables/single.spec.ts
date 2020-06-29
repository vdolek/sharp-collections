import { ArrayEnumerable } from '@src/internal';
import { expect } from 'chai';

describe('Single tests', () => {
    it('Simple test', () => {
        const enumerable = new ArrayEnumerable([2]);
        const value = enumerable.single();

        expect(value).to.be.equal(2);
    });

    it('Simple predicate test', () => {
        const enumerable = new ArrayEnumerable([2, 4, 6]);
        const value = enumerable.single(x => x > 5);

        expect(value).to.be.equal(6);
    });

    it('Empty source test', () => {
        const enumerable = new ArrayEnumerable<number>([]);

        expect(() => enumerable.single()).throws;
    });

    it('Empty source predicate test', () => {
        const enumerable = new ArrayEnumerable<number>([]);

        expect(() => enumerable.single(x => x > 3)).throws;
    });

    it('Empty source predicate test 2', () => {
        const enumerable = new ArrayEnumerable<number>([2, 4, 6]);

        expect(() => enumerable.single(x => x > 10)).throws;
    });

    it('Multiple test', () => {
        const enumerable = new ArrayEnumerable<number>([2, 4, 6]);

        expect(() => enumerable.single()).throws;
    });

    it('Multiple predicate test', () => {
        const enumerable = new ArrayEnumerable<number>([2, 4, 6]);

        expect(() => enumerable.single(x => x > 3)).throws;
    });
});
