import { expect } from 'chai';

import { List } from '../../../src/index';

describe('List creation tests', () => {
    it('empty test', () => {
        const list = List.empty();

        expect(list.toArray()).to.be.deep.equal([]);
    });

    it('from test', () => {
        const list = List.from([2, 4, 6]);

        expect(list.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('fromRest test', () => {
        const list = List.fromRest(2, 4, 6);

        expect(list.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('fromRest range1', () => {
        const list = List.range(3);

        expect(list.toArray()).to.be.deep.equal([0, 1, 2]);
    });

    it('fromRest range2', () => {
        const list = List.range(10, 3);

        expect(list.toArray()).to.be.deep.equal([10, 11, 12]);
    });

    it('fromRest range3', () => {
        const list = List.range(10, 3, 2);

        expect(list.toArray()).to.be.deep.equal([10, 12, 14]);
    });

    it('fromRest repeat', () => {
        const list = List.repeat(2, 3);

        expect(list.toArray()).to.be.deep.equal([2, 2, 2]);
    });

    it('fromRest single', () => {
        const list = List.single(2);

        expect(list.toArray()).to.be.deep.equal([2]);
    });
});
