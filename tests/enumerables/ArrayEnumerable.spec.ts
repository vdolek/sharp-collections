import { expect } from 'chai';

import { ArrayEnumerable } from '../../src/internal';

describe('ArrayEnumerable tests', () => {
    it('toArray test', () => {
        const arrayEnumerable = new ArrayEnumerable([2, 4, 6]);

        expect(arrayEnumerable.toArray()).to.be.deep.equal([2, 4, 6]);
    });
});
