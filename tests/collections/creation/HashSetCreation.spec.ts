import { expect } from 'chai';

import { HashSet } from '../../../src/index';

describe('HashSet creation tests', () => {
    it('empty test', () => {
        const set = HashSet.empty();

        expect(set.toArray()).to.be.deep.equal([]);
    });

    it('from test', () => {
        const set = HashSet.from([2, 4, 6]);

        expect(set.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('fromRest test', () => {
        const set = HashSet.fromRest(2, 4, 6);

        expect(set.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('fromRest range1', () => {
        const set = HashSet.range(3);

        expect(set.toArray()).to.be.deep.equal([0, 1, 2]);
    });

    it('fromRest range2', () => {
        const set = HashSet.range(10, 3);

        expect(set.toArray()).to.be.deep.equal([10, 11, 12]);
    });

    it('fromRest range3', () => {
        const set = HashSet.range(10, 3, 2);

        expect(set.toArray()).to.be.deep.equal([10, 12, 14]);
    });

    it('fromRest single', () => {
        const set = HashSet.single(2);

        expect(set.toArray()).to.be.deep.equal([2]);
    });
});
