import { expect } from 'chai';

import { List } from '../../src/internal';

describe('reverse tests', () => {
    it('simple test', () => {
        const list = List.fromElements(2, 4, 6)
            .reverse();

        expect(list.toArray()).to.be.deep.equal([6, 4, 2]);
    });
});
