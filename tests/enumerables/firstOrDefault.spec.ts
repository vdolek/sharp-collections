import { ArrayEnumerable } from '@src/internal';
import { expect } from 'chai';

describe('FirstOrDefault tests', () => {
    it('Simple test', () => {
        const enumerable = new ArrayEnumerable([2, 4, 6]);
        const value = enumerable.firstOrDefault();

        expect(value).to.be.equal(2);
    });

    it('Simple predicate test', () => {
        const enumerable = new ArrayEnumerable([2, 4, 6]);
        const value = enumerable.firstOrDefault(x => x > 3);

        expect(value).to.be.equal(4);
    });

    it('Empty source test', () => {
        const enumerable = new ArrayEnumerable<number>([]);
        const value = enumerable.firstOrDefault();

        expect(value).to.be.null;
    });

    it('Empty source predicate test', () => {
        const enumerable = new ArrayEnumerable<number>([]);
        const value = enumerable.firstOrDefault(x => x > 3);

        expect(value).to.be.null;
    });

    it('Empty source predicate test 2', () => {
        const enumerable = new ArrayEnumerable<number>([2, 4, 6]);
        const value = enumerable.firstOrDefault(x => x > 10);

        expect(value).to.be.null;
    });
});
