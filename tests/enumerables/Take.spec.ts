import { expect } from 'chai';

import { List } from '../../src/internal';

describe('take tests', () => {
    it('simple test', () => {
        const list = List.fromRest(2, 4, 6, 8);

        expect(list.take(0).toArray()).to.be.empty;
        expect(list.take(1).toArray()).to.be.deep.equal([2]);
        expect(list.take(3).toArray()).to.be.deep.equal([2, 4, 6]);
        expect(list.take(4).toArray()).to.be.deep.equal([2, 4, 6, 8]);
        expect(list.take(10).toArray()).to.be.deep.equal([2, 4, 6, 8]);
    });
});
