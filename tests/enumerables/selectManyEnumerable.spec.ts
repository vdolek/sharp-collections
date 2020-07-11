import { List } from '@src/internal';
import { expect } from 'chai';

describe('SelectManyEnumerable tests', () => {
    it('Simple test', () => {
        const list1 = List.from(
            { dummy: List.from(2, 4, 6) },
            { dummy: List.empty<number>() },
            { dummy: List.from(3, 5) },
            { dummy:  List.from(9) }
        );

        const list2 = list1.selectMany(x => x.dummy);

        expect(list2.toArray()).to.be.deep.equal([2, 4, 6, 3, 5, 9]);
    });
});
