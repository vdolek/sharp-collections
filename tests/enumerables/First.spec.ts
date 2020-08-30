import { expect } from 'chai';

import { List } from '../../src/internal';

describe('first tests', () => {
    it('simple test', () => {
        const list = List.fromRest(2, 4, 6);
        const value = list.first();

        expect(value).to.be.equal(2);
    });

    it('simple predicate test', () => {
        const list = List.fromRest(2, 4, 6);
        const value = list.first(x => x > 3);

        expect(value).to.be.equal(4);
    });

    it('empty source test', () => {
        const list = List.fromRest<number>();

        expect(() => list.first()).throws;
    });

    it('empty source predicate test', () => {
        const list = List.fromRest<number>();

        expect(() => list.first(x => x > 3)).throws;
    });

    it('empty source predicate test 2', () => {
        const list = List.fromRest(2, 4, 6);

        expect(() => list.first(x => x > 10)).throws;
    });
});
