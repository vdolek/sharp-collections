import { List } from '@sharp-collections';
import { expect } from 'chai';

describe('selectMany tests', () => {
    it('simple test', () => {
        const list1 = List.fromElements(
            { dummy: List.fromElements(2, 4, 6) },
            { dummy: List.empty<number>() },
            { dummy: List.fromElements(3, 5) },
            { dummy:  List.fromElements(9) }
        );

        const list2 = list1.selectMany(x => x.dummy);

        expect(list2.toArray()).to.be.deep.equal([2, 4, 6, 3, 5, 9]);
    });
});
