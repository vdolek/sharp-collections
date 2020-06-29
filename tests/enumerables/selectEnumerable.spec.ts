import { ArrayEnumerable } from '@src/internal';
import { expect } from 'chai';

describe('SelectEnumerable tests', () => {
    it('Simple test', () => {
        const enumerable = new ArrayEnumerable([2, 4, 6])
            .select(x => x * 2);

        expect(enumerable.toArray()).to.be.deep.equal([4, 8, 12]);
    });

    it('Empty source test', () => {
        const enumerable = new ArrayEnumerable<number>([])
            .select(x => x * 2);

        expect(enumerable.toArray()).to.be.empty;
    });
});
