import { expect } from 'chai';

import { LinkedList } from '../../../src/index';

describe('LinkedList creation tests', () => {
    it('empty test', () => {
        const list = LinkedList.empty();

        expect(list.toArray()).to.be.deep.equal([]);
    });

    it('from test', () => {
        const list = LinkedList.from([2, 4, 6]);

        expect(list.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('fromRest test', () => {
        const list = LinkedList.fromRest(2, 4, 6);

        expect(list.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('fromRest range1', () => {
        const list = LinkedList.range(3);

        expect(list.toArray()).to.be.deep.equal([0, 1, 2]);
    });

    it('fromRest range2', () => {
        const list = LinkedList.range(10, 3);

        expect(list.toArray()).to.be.deep.equal([10, 11, 12]);
    });

    it('fromRest range3', () => {
        const list = LinkedList.range(10, 3, 2);

        expect(list.toArray()).to.be.deep.equal([10, 12, 14]);
    });

    it('fromRest repeat', () => {
        const list = LinkedList.repeat(2, 3);

        expect(list.toArray()).to.be.deep.equal([2, 2, 2]);
    });

    it('fromRest single', () => {
        const list = LinkedList.single(2);

        expect(list.toArray()).to.be.deep.equal([2]);
    });
});
