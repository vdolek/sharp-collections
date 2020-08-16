import { expect } from 'chai';

import { List } from '../../src/internal';

describe('select tests', () => {
    it('simple test', () => {
        const list = List.fromElements(2, 4, 6)
            .select(x => x * 2);

        expect(list.toArray()).to.be.deep.equal([4, 8, 12]);
    });

    it('indexed test', () => {
        const list = List.fromElements(2, 4, 6)
            .select((x, idx) => [idx, x * 2]);

        expect(list.toArray()).to.be.deep.equal([ [0, 4], [1, 8], [2, 12] ]);
    });

    it('empty source test', () => {
        const list = List.empty<number>()
            .select(x => x * 2);

        expect(list.toArray()).to.be.empty;
    });
});
