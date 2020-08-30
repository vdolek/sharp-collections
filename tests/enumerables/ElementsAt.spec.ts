import { expect } from 'chai';

import { List } from '../../src/internal';

describe('elementsAt tests', () => {
    it('elementsAt test', () => {
        const list = List.fromRest(0, 2, 4, 6, 8, 10, 12);

        expect(list.elementsAt([]).toArray()).to.be.deep.equal([]);
        expect(list.elementsAt([1, 4, 3]).toArray()).to.be.deep.equal([2, 8, 6]);
        expect(() => list.elementsAt([1, 4, 99, 3]).toArray()).throws(Error, 'Index was out of range');
        expect(() => list.elementsAt([1, 4, -99, 3]).toArray()).throws(Error, 'Index was out of range');
    });
});
