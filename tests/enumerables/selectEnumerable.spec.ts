import { List } from '@src/internal';
import { expect } from 'chai';

describe('SelectEnumerable tests', () => {
    it('Simple test', () => {
        const list = new List([2, 4, 6])
            .select(x => x * 2);

        expect(list.toArray()).to.be.deep.equal([4, 8, 12]);
    });

    it('Indexed test', () => {
        const list = new List([2, 4, 6])
            .select((x: number, idx: number) => [idx, x * 2]);

        expect(list.toArray()).to.be.deep.equal([ [0, 4], [1, 8], [2, 12] ]);
    });

    it('Empty source test', () => {
        const list = new List<number>([])
            .select(x => x * 2);

        expect(list.toArray()).to.be.empty;
    });
});
