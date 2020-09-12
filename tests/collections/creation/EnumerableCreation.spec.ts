import { expect } from 'chai';

import { Enumerable } from '../../../src/internal';

describe('Enumerable creation tests', () => {
    it('empty test', () => {
        const enumerable = Enumerable.empty();

        expect(enumerable.toArray()).to.be.deep.equal([]);
    });

    it('from test', () => {
        const enumerable = Enumerable.from([2, 4, 6]);

        expect(enumerable.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('fromRest test', () => {
        const enumerable = Enumerable.fromRest(2, 4, 6);

        expect(enumerable.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('fromRest range1', () => {
        const enumerable = Enumerable.range(3);

        expect(enumerable.toArray()).to.be.deep.equal([0, 1, 2]);
    });

    it('fromRest range2', () => {
        const enumerable = Enumerable.range(10, 3);

        expect(enumerable.toArray()).to.be.deep.equal([10, 11, 12]);
    });

    it('fromRest range3', () => {
        const enumerable = Enumerable.range(10, 3, 2);

        expect(enumerable.toArray()).to.be.deep.equal([10, 12, 14]);
    });

    it('fromRest repeat', () => {
        const enumerable = Enumerable.repeat(2, 3);

        expect(enumerable.toArray()).to.be.deep.equal([2, 2, 2]);
    });

    it('fromRest single', () => {
        const enumerable = Enumerable.single(2);

        expect(enumerable.toArray()).to.be.deep.equal([2]);
    });
});
