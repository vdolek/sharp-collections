import { List } from '@src/internal';
import { expect } from 'chai';

describe('SkipWhileEnumerable tests', () => {
    it('Simple test', () => {
        const list = List.from(2, 4, 6, 8, 2)
            .skipWhile(x => x < 5);

        expect(list.toArray()).to.be.deep.equal([6, 8, 2]);
    });

    it('Simple indexed test', () => {
        const list = List.from(2, 4, 6, 8, 2)
            .skipWhile((x, idx) => idx < 3);

        expect(list.toArray()).to.be.deep.equal([8, 2]);
    });

    it('Empty source test', () => {
        const list = List.empty<number>()
            .skipWhile(x => x < 5);

        expect(list.toArray()).to.be.empty;
    });

    it('Empty result test', () => {
        const list = List.from(2, 4, 6, 8, 2)
            .skipWhile(x => x < 10);

        expect(list.toArray()).to.be.empty;
    });
});
