import { expect } from 'chai';

import { Enumerable, IndexedPair } from '../../src/index';

describe('asIndexed tests', () => {
    it('simple test', () => {
        const indexed = Enumerable.fromRest(0, 2, 4)
            .asIndexed();

        expect(indexed.toArray()).to.be.deep.equal([
            IndexedPair.from(0, 0),
            IndexedPair.from(1, 2),
            IndexedPair.from(2, 4),
        ]);
    });

    it('forOf test', () => {
        const indexed = Enumerable.fromRest(0, 2, 4)
            .asIndexed();

        for (const { index, value } of indexed) {
            expect(value).to.be.equal(index * 2);
        }
    });
});
