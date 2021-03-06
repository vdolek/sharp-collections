import { expect } from 'chai';

import { List } from '../../src/index';

describe('slice tests', () => {
    it('simple test', () => {
        const list = List.fromRest(2, 4, 6, 8, 10);
        const sliced = list.slice(2, 2);

        expect(sliced.toArray()).to.be.deep.equal([6, 8]);
    });
});
