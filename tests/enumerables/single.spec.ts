import { List } from '@src/internal';
import { expect } from 'chai';

describe('Single tests', () => {
    it('Simple test', () => {
        const list = List.from(2);
        const value = list.single();

        expect(value).to.be.equal(2);
    });

    it('Simple predicate test', () => {
        const list = List.from(2, 4, 6);
        const value = list.single(x => x > 5);

        expect(value).to.be.equal(6);
    });

    it('Empty source test', () => {
        const list = List.empty<number>();

        expect(() => list.single()).throws;
    });

    it('Empty source predicate test', () => {
        const list = List.empty<number>();

        expect(() => list.single(x => x > 3)).throws;
    });

    it('Empty source predicate test 2', () => {
        const list = List.from(2, 4, 6);

        expect(() => list.single(x => x > 10)).throws;
    });

    it('Multiple test', () => {
        const list = List.from(2, 4, 6);

        expect(() => list.single()).throws;
    });

    it('Multiple predicate test', () => {
        const list = List.from(2, 4, 6);

        expect(() => list.single(x => x > 3)).throws;
    });
});
