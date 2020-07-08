import { List } from '@src/internal';
import { expect } from 'chai';

describe('SelectManyEnumerable tests', () => {
    it('Simple test', () => {
        const list1 = new List([
            { dummy: new List([2, 4, 6]) },
            { dummy: new List([]) },
            { dummy: new List([3, 5]) },
            { dummy:  new List([9]) }
        ]);

        const list2 = list1.selectMany(x => x.dummy);

        expect(list2.toArray()).to.be.deep.equal([2, 4, 6, 3, 5, 9]);
    });
});
