import { ArrayEnumerable } from '@src/internal';
import { expect } from 'chai';

describe('ArrayEnumerable tests', () => {
    it('toArray', () => {
        const enumerable = new ArrayEnumerable([2, 4, 6]);

        expect(enumerable.toArray()).to.be.deep.equal([2, 4, 6]);
    });
});
