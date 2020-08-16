import { Enumerable, List } from '../../src/internal';
import { expect } from 'chai';

describe('intersect tests', () => {
    it('simple test', () => {
        const array = List.fromElements(2, 4, 6, 8, 10)
            .intersect(Enumerable.fromElements(4, 8))
            .toArray();

        expect(array).to.be.deep.equal([4, 8]);
    });

    it('empty result test', () => {
        const array = List.fromElements(2, 4, 6, 8, 10)
            .intersect(List.fromElements(12, 14, 16))
            .toArray();

        expect(array).to.be.empty;
    });
});
