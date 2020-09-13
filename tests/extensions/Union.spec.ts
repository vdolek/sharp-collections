import { expect } from 'chai';

import { List } from '../../src/index';

describe('union tests', () => {
    it('simple test', () => {
        const list1 = List.fromRest(1, 2, 3, 2);
        const list2 = List.fromRest(1, 3, 4);
        const list3 = list1.union(list2);

        expect(list3.toArray()).to.be.deep.equal([1, 2, 3, 4]);
    });
});
