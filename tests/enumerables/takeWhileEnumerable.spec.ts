import { List } from '@src/internal';
import { expect } from 'chai';

describe('TakeWhileEnumerable tests', () => {
    it('Simple test', () => {
        const list = new List([2, 4, 6, 8, 10])
            .takeWhile(x => x < 5);

        expect(list.toArray()).to.be.deep.equal([2, 4]);
    });

    it('Simple indexed test', () => {
        const list = new List([2, 4, 6, 8, 10])
            .takeWhile((x: number, idx: number) => idx < 3);

        expect(list.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('Empty source test', () => {
        const list = new List<number>([])
            .takeWhile(x => x < 5);

        expect(list.toArray()).to.be.empty;
    });

    it('Empty result test', () => {
        const list = new List([2, 4, 6, 8, 10])
            .takeWhile(x => x > 10);

        expect(list.toArray()).to.be.empty;
    });
});
