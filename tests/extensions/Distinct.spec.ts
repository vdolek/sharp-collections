import { expect } from 'chai';

import { EqualityComparer, List } from '../../src/index';

describe('distinct tests', () => {
    it('distinct test', () => {
        const list = List.fromRest(1, 3, 2, 3, 1, 4, 2);
        const distinct = list
            .distinct()
            .toArray();

        expect(distinct).to.be.deep.equal([1, 3, 2, 4]);
    });

    it('distinct equality comparer test', () => {
        const list = List.fromRest(1, 6, 5, 3, 1, 4, 2);
        const distinct = list
            .distinct(EqualityComparer.fromSelector(x => x % 3))
            .toArray();

        expect(distinct).to.be.deep.equal([1, 6, 5]);
    });

    it('distinctBy test', () => {
        const list = List.fromRest(1, 10, 9, 12, 2, 23, 5, 10);
        const distinct = list
            .distinctBy(x => x % 5)
            .toArray();

        expect(distinct).to.be.deep.equal([1, 10, 9, 12, 23]);
    });
});
