import { ArrayEnumerable } from '@src/Internal';
import { expect } from 'chai';

describe('ArrayEnumerable tests', () => {
    it('toArray', () => {
        const arrayEnumerable = new ArrayEnumerable([2, 4, 6]);

        expect(arrayEnumerable.toArray()).to.be.deep.equal([2, 4, 6]);
    });
});
