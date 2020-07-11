import { List } from '@src/Internal';
import { expect } from 'chai';

describe('SelectEnumerable tests', () => {
    it('Simple test', () => {
        const list = List.from(2, 4, 6)
            .select(x => x * 2);

        expect(list.toArray()).to.be.deep.equal([4, 8, 12]);
    });

    it('Indexed test', () => {
        const list = List.from(2, 4, 6)
            .select((x, idx) => [idx, x * 2]);

        expect(list.toArray()).to.be.deep.equal([ [0, 4], [1, 8], [2, 12] ]);
    });

    it('Empty source test', () => {
        const list = List.empty<number>()
            .select(x => x * 2);

        expect(list.toArray()).to.be.empty;
    });
});
