import { expect } from 'chai';

import { List } from '../../src/internal';

describe('selectMany tests', () => {
    it('simple test', () => {
        const list1 = List.fromRest(
            { dummy: List.fromRest(2, 4, 6) },
            { dummy: List.empty<number>() },
            { dummy: List.fromRest(3, 5) },
            { dummy:  List.fromRest(9) }
        );

        const list2 = list1.selectMany(x => x.dummy);

        expect(list2.toArray()).to.be.deep.equal([2, 4, 6, 3, 5, 9]);
    });
});
