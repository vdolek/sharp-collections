import { expect } from 'chai';

import { Enumerable } from '../../src/index';

describe('append tests', () => {
    it('simple test', () => {
        const list = Enumerable.fromRest(2, 4, 6);
        const appended = list.append(99).toArray();

        expect(appended).to.be.deep.equal([2, 4, 6, 99]);
    });
});
