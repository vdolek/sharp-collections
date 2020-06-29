import { ArrayEnumerable } from '@src/internal';
import { expect } from 'chai';

describe('SingleOrDefault tests', () => {
    it('Simple test', () => {
        const enumerable = new ArrayEnumerable([2]);
        const value = enumerable.singleOrDefault();

        expect(value).to.be.equal(2);
    });

    it('Simple predicate test', () => {
        const enumerable = new ArrayEnumerable([2, 4, 6]);
        const value = enumerable.singleOrDefault(x => x > 5);

        expect(value).to.be.equal(6);
    });

    it('Empty source test', () => {
        const enumerable = new ArrayEnumerable<number>([]);
        const value = enumerable.singleOrDefault();

        expect(value).to.be.null;
    });

    it('Empty source predicate test', () => {
        const enumerable = new ArrayEnumerable<number>([]);
        const value = enumerable.singleOrDefault(x => x > 3);

        expect(value).to.be.null;
    });

    it('Empty source predicate test 2', () => {
        const enumerable = new ArrayEnumerable<number>([2, 4, 6]);
        const value = enumerable.singleOrDefault(x => x > 10);

        expect(value).to.be.null;
    });

    it('Multiple test', () => {
        const enumerable = new ArrayEnumerable<number>([2, 4, 6]);

        expect(() => enumerable.singleOrDefault()).throws;
    });

    it('Multiple predicate test', () => {
        const enumerable = new ArrayEnumerable<number>([2, 4, 6]);

        expect(() => enumerable.singleOrDefault(x => x > 3)).throws;
    });
});
