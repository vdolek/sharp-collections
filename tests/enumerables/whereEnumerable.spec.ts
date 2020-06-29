import { ArrayEnumerable } from '@src/internal';
import { expect } from 'chai';

describe('WhereEnumerable tests', () => {
    it('Simple test', () => {
        const enumerable = new ArrayEnumerable([2, 4, 6])
            .where(x => x > 3);

        expect(enumerable.toArray()).to.be.deep.equal([4, 6]);
    });

    it('Empty source test', () => {
        const enumerable = new ArrayEnumerable([])
            .where(x => x > 3);

        expect(enumerable.toArray()).to.be.empty;
    });

    it('Empty result test', () => {
        const enumerable = new ArrayEnumerable([2, 4, 6])
            .where(x => x > 10);

        expect(enumerable.toArray()).to.be.empty;
    });
});

