import { List } from '@src/Internal';
import { expect } from 'chai';

describe('concat tests', () => {
    it('simple test', () => {
        const list1 = List.from(2, 4, 6);
        const list2 = List.from(3, 5);
        const list3 = list1.concat(list2);

        expect(list3.toArray()).to.be.deep.equal([2, 4, 6, 3, 5]);
    });
});