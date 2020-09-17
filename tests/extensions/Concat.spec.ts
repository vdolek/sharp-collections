import { expect } from 'chai';

import { List } from '../../src/index';

describe('concat tests', () => {
    it('simple test', () => {
        const list1 = List.fromRest(2, 4, 6);
        const list2 = List.fromRest(3, 5);
        const list3 = list1.concat(list2);

        expect(list3.toArray()).to.be.deep.equal([2, 4, 6, 3, 5]);
    });
});
