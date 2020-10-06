import { expect } from 'chai';

import { Enumerable, EqualityComparer, List } from '../../src/index';

describe('except tests', () => {
    it('simple test', () => {
        const list = List.fromRest(2, 4, 6, 8, 10)
            .except(Enumerable.fromRest(4, 8));

        expect(list.toArray()).to.be.deep.equal([2, 6, 10]);
    });

    it('simple test', () => {
        const list = List.fromRest(2, 4, 6, 8, 10)
            .except(Enumerable.fromRest(4, 8));

        expect(list.toArray()).to.be.deep.equal([2, 6, 10]);
    });

    it('equality comparer test', () => {
        const list = List.fromRest(2, 4, 6, 8, 10)
            .except(Enumerable.fromRest(1, 2), EqualityComparer.fromSelector(x => x % 3));

        expect(list.toArray()).to.be.deep.equal([6]);
    });
});
