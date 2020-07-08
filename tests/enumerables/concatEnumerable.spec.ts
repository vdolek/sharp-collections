import { List } from '@src/internal';
import { expect } from 'chai';

describe('ConcatEnumerable tests', () => {
    it('Simple test', () => {
        const list1 = new List([2, 4, 6]);
        const list2 = new List([3, 5]);
        const list3 = list1.concat(list2);

        expect(list3.toArray()).to.be.deep.equal([2, 4, 6, 3, 5]);
    });
});
