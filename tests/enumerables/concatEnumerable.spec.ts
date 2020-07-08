import { ArrayEnumerable } from '@src/internal';
import { expect } from 'chai';

describe('ConcatEnumerable tests', () => {
    it('Simple test', () => {
        const e1 = new ArrayEnumerable([2, 4, 6]);
        const e2 = new ArrayEnumerable([3, 5]);
        const e3 = e1.concat(e2);

        expect(e3.toArray()).to.be.deep.equal([2, 4, 6, 3, 5]);
    });
});
