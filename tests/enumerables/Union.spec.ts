import { List } from '../../src/internal';
import { expect } from 'chai';

describe('union tests', () => {
    it('simple test', () => {
        const list1 = List.fromElements(1, 2, 3, 2);
        const list2 = List.fromElements(1, 3, 4);
        const list3 = list1.union(list2);

        expect(list3.toArray()).to.be.deep.equal([1, 2, 3, 4]);
    });
});
