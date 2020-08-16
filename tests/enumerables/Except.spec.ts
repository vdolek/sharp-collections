import { expect } from 'chai';

import { Enumerable, List } from '../../src/internal';

describe('except tests', () => {
    it('simple test', () => {
        const list = List.fromElements(2, 4, 6, 8, 10)
            .except(Enumerable.fromElements(4, 8));

        expect(list.toArray()).to.be.deep.equal([2, 6, 10]);
    });
});
