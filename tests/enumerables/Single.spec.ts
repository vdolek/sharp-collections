import { List } from '../../src/internal';
import { expect } from 'chai';

describe('single tests', () => {
    it('simple test', () => {
        const list = List.fromElements(2);
        const value = list.single();

        expect(value).to.be.equal(2);
    });

    it('simple predicate test', () => {
        const list = List.fromElements(2, 4, 6);
        const value = list.single(x => x > 5);

        expect(value).to.be.equal(6);
    });

    it('empty source test', () => {
        const list = List.empty<number>();

        expect(() => list.single()).throws;
    });

    it('empty source predicate test', () => {
        const list = List.empty<number>();

        expect(() => list.single(x => x > 3)).throws;
    });

    it('empty source predicate test 2', () => {
        const list = List.fromElements(2, 4, 6);

        expect(() => list.single(x => x > 10)).throws;
    });

    it('multiple test', () => {
        const list = List.fromElements(2, 4, 6);

        expect(() => list.single()).throws;
    });

    it('multiple predicate test', () => {
        const list = List.fromElements(2, 4, 6);

        expect(() => list.single(x => x > 3)).throws;
    });
});
