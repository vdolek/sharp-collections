import { ArrayEnumerable, List } from '@src/internal';
import { expect } from 'chai';

describe('List tests', () => {
    it('from array', () => {
        const enumerable = List.from(2, 4, 6);

        expect(enumerable.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('from enumerable', () => {
        const enumerable = new List(new ArrayEnumerable([2, 4, 6]));

        expect(enumerable.toArray()).to.be.deep.equal([2, 4, 6]);
    });
});
