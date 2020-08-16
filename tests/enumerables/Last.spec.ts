import { expect } from 'chai';

import { List } from '../../src/internal';

describe('last tests', () => {
    it('simple test', () => {
        const list = List.fromElements(2, 4, 6);
        const value = list.last();

        expect(value).to.be.equal(6);
    });

    it('simple predicate test', () => {
        const list = List.fromElements(2, 4, 6);
        const value = list.last(x => x < 5);

        expect(value).to.be.equal(4);
    });

    it('empty source test', () => {
        const list = List.fromElements<number>();

        expect(() => list.last()).throws(Error, 'Sequence contains no elements');
    });

    it('empty source predicate test', () => {
        const list = List.fromElements<number>();

        expect(() => list.last(x => x > 3)).throws(Error, 'Sequence contains no matching element');
    });

    it('empty source predicate test 2', () => {
        const list = List.fromElements(2, 4, 6);

        expect(() => list.last(x => x > 10)).throws(Error, 'Sequence contains no matching element');
    });
});
