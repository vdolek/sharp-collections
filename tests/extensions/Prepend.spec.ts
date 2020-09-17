import { expect } from 'chai';

import { Enumerable } from '../../src/index';

describe('prepend tests', () => {
    it('simple test', () => {
        const list = Enumerable.fromRest(2, 4, 6);
        const appended = list.prepend(99).toArray();

        expect(appended).to.be.deep.equal([99, 2, 4, 6]);
    });
});
