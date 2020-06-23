import { ArrayEnumerable } from '@src/enumerables/arrayEnumerable';
import { expect } from 'chai';

describe('Options tests', () => {
    it('checking default options', () => {
        const enumerable = new ArrayEnumerable([2, 4, 6]);

        expect(enumerable.toArray()).to.be.deep.equal([2, 4, 6]);
    });
});
