import { expect } from 'chai';

import { Dictionary, Enumerable } from '../../src/index';

describe('Enumerable tests', () => {
    it('empty', () => {
        const enumerable = Enumerable.empty<number>();

        expect(enumerable.toArray()).to.be.empty;
    });

    it('from', () => {
        const enumerable = Enumerable.from([2, 4, 6]);

        expect(enumerable.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('fromRest', () => {
        const enumerable = Enumerable.fromRest(2, 4, 6);

        expect(enumerable.toArray()).to.be.deep.equal([2, 4, 6]);
    });

    it('repeat', () => {
        const enumerable = Enumerable.repeat(3, 5);

        expect(enumerable.toArray()).to.be.deep.equal([3, 3, 3, 3, 3]);
    });

    it('range1', () => {
        const enumerable = Enumerable.range(5);

        expect(enumerable.toArray()).to.be.deep.equal([0, 1, 2, 3, 4]);
    });

    it('range2', () => {
        const enumerable = Enumerable.range(5, 4);

        expect(enumerable.toArray()).to.be.deep.equal([5, 6, 7, 8]);
    });

    it('range3', () => {
        const enumerable = Enumerable.range(5, 4, 2);

        expect(enumerable.toArray()).to.be.deep.equal([5, 7, 9, 11]);
    });
});
