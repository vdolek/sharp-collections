import { expect } from 'chai';

import { Enumerable, List } from '../../src/internal';

describe('intersect tests', () => {
    it('simple test', () => {
        const array = List.fromRest(2, 4, 6, 8, 10)
            .intersect(Enumerable.fromRest(4, 8))
            .toArray();

        expect(array).to.be.deep.equal([4, 8]);
    });

    it('empty result test', () => {
        const array = List.fromRest(2, 4, 6, 8, 10)
            .intersect(List.fromRest(12, 14, 16))
            .toArray();

        expect(array).to.be.empty;
    });
});
