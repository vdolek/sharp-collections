import { expect } from 'chai';

import { ReadOnlyList } from '../../../src/internal';

describe('ReadOnlyList creation tests', () => {
    it('empty test', () => {
        const list = ReadOnlyList.empty();

        expect(list.toArray()).to.be.deep.equal([]);
    });

    it('from test', () => {
        const list = ReadOnlyList.from([2, 4, 6]);

        expect(list.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('fromRest test', () => {
        const list = ReadOnlyList.fromRest(2, 4, 6);

        expect(list.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('fromRest range1', () => {
        const list = ReadOnlyList.range(3);

        expect(list.toArray()).to.be.deep.equal([0, 1, 2]);
    });

    it('fromRest range2', () => {
        const list = ReadOnlyList.range(10, 3);

        expect(list.toArray()).to.be.deep.equal([10, 11, 12]);
    });

    it('fromRest range3', () => {
        const list = ReadOnlyList.range(10, 3, 2);

        expect(list.toArray()).to.be.deep.equal([10, 12, 14]);
    });

    it('fromRest repeat', () => {
        const list = ReadOnlyList.repeat(2, 3);

        expect(list.toArray()).to.be.deep.equal([2, 2, 2]);
    });

    it('fromRest single', () => {
        const list = ReadOnlyList.single(2);

        expect(list.toArray()).to.be.deep.equal([2]);
    });
});
