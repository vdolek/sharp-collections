import { List } from '@src/internal';
import { expect } from 'chai';

describe('WhereEnumerable tests', () => {
    it('Simple test', () => {
        const list = new List([2, 4, 6])
            .where(x => x > 3);

        expect(list.toArray()).to.be.deep.equal([4, 6]);
    });

    it('Simple indexed test', () => {
        const list = new List([2, 4, 6])
            .where((x: number, idx: number) => idx % 2 === 0);

        expect(list.toArray()).to.be.deep.equal([2, 6]);
    });

    it('Empty source test', () => {
        const list = new List<number>([])
            .where(x => x > 3);

        expect(list.toArray()).to.be.empty;
    });

    it('Empty result test', () => {
        const list = new List([2, 4, 6])
            .where(x => x > 10);

        expect(list.toArray()).to.be.empty;
    });
});
