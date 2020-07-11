import { List } from '@src/Internal';
import { expect } from 'chai';

describe('where tests', () => {
    it('simple test', () => {
        const list = List.from(2, 4, 6)
            .where(x => x > 3);

        expect(list.toArray()).to.be.deep.equal([4, 6]);
    });

    it('simple indexed test', () => {
        const list = List.from(2, 4, 6)
            .where((x, idx) => idx % 2 === 0);

        expect(list.toArray()).to.be.deep.equal([2, 6]);
    });

    it('empty source test', () => {
        const list = List.empty<number>()
            .where(x => x > 3);

        expect(list.toArray()).to.be.empty;
    });

    it('empty result test', () => {
        const list = List.from(2, 4, 6)
            .where(x => x > 10);

        expect(list.toArray()).to.be.empty;
    });
});
