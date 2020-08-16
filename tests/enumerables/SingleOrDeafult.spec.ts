import { expect } from 'chai';

import { List } from '../../src/internal';

describe('singleOrNull tests', () => {
    it('simple test', () => {
        const list = List.fromElements(2);
        const value = list.singleOrNull();

        expect(value).to.be.equal(2);
    });

    it('simple predicate test', () => {
        const list = List.fromElements(2, 4, 6);
        const value = list.singleOrNull(x => x > 5);

        expect(value).to.be.equal(6);
    });

    it('empty source test', () => {
        const list = List.empty<number>();
        const value = list.singleOrNull();

        expect(value).to.be.null;
    });

    it('empty source predicate test', () => {
        const list = List.empty<number>();
        const value = list.singleOrNull(x => x > 3);

        expect(value).to.be.null;
    });

    it('empty source predicate test 2', () => {
        const list = List.fromElements(2, 4, 6);
        const value = list.singleOrNull(x => x > 10);

        expect(value).to.be.null;
    });

    it('multiple test', () => {
        const list = List.fromElements(2, 4, 6);

        expect(() => list.singleOrNull()).throws;
    });

    it('multiple predicate test', () => {
        const list = List.fromElements(2, 4, 6);

        expect(() => list.singleOrNull(x => x > 3)).throws;
    });
});
