import { ArrayEnumerable } from '@src/internal';
import { expect } from 'chai';

describe('First tests', () => {
    it('Simple test', () => {
        const enumerable = new ArrayEnumerable([2, 4, 6]);
        const value = enumerable.first();

        expect(value).to.be.equal(2);
    });

    it('Simple predicate test', () => {
        const enumerable = new ArrayEnumerable([2, 4, 6]);
        const value = enumerable.first(x => x > 3);

        expect(value).to.be.equal(4);
    });

    it('Empty source test', () => {
        const enumerable = new ArrayEnumerable<number>([]);

        expect(() => enumerable.first()).throws;
    });

    it('Empty source predicate test', () => {
        const enumerable = new ArrayEnumerable<number>([]);

        expect(() => enumerable.first(x => x > 3)).throws;
    });

    it('Empty source predicate test 2', () => {
        const enumerable = new ArrayEnumerable<number>([2, 4, 6]);

        expect(() => enumerable.first(x => x > 10)).throws;
    });
});
