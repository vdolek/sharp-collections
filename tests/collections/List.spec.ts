import { ArrayEnumerable, List } from '@src/Internal';
import { expect } from 'chai';

describe('List tests', () => {
    it('fromElements array', () => {
        const enumerable = List.fromElements(2, 4, 6);

        expect(enumerable.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('fromElements enumerable', () => {
        const enumerable = new List(new ArrayEnumerable([2, 4, 6]));

        expect(enumerable.toArray()).to.be.deep.equal([2, 4, 6]);
    });
});
