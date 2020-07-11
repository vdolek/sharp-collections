import { List } from '@src/Internal';
import { expect } from 'chai';

describe('First tests', () => {
    it('Simple test', () => {
        const list = List.from(2, 4, 6);
        const value = list.first();

        expect(value).to.be.equal(2);
    });

    it('Simple predicate test', () => {
        const list = List.from(2, 4, 6);
        const value = list.first(x => x > 3);

        expect(value).to.be.equal(4);
    });

    it('Empty source test', () => {
        const list = List.from<number>();

        expect(() => list.first()).throws;
    });

    it('Empty source predicate test', () => {
        const list = List.from<number>();

        expect(() => list.first(x => x > 3)).throws;
    });

    it('Empty source predicate test 2', () => {
        const list = List.from(2, 4, 6);

        expect(() => list.first(x => x > 10)).throws;
    });
});
