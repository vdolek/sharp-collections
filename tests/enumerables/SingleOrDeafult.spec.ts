import { List } from '@src/Internal';
import { expect } from 'chai';

describe('singleOrDefault tests', () => {
    it('simple test', () => {
        const list = List.from(2);
        const value = list.singleOrDefault();

        expect(value).to.be.equal(2);
    });

    it('simple predicate test', () => {
        const list = List.from(2, 4, 6);
        const value = list.singleOrDefault(x => x > 5);

        expect(value).to.be.equal(6);
    });

    it('empty source test', () => {
        const list = List.empty<number>();
        const value = list.singleOrDefault();

        expect(value).to.be.null;
    });

    it('empty source predicate test', () => {
        const list = List.empty<number>();
        const value = list.singleOrDefault(x => x > 3);

        expect(value).to.be.null;
    });

    it('empty source predicate test 2', () => {
        const list = List.from(2, 4, 6);
        const value = list.singleOrDefault(x => x > 10);

        expect(value).to.be.null;
    });

    it('multiple test', () => {
        const list = List.from(2, 4, 6);

        expect(() => list.singleOrDefault()).throws;
    });

    it('multiple predicate test', () => {
        const list = List.from(2, 4, 6);

        expect(() => list.singleOrDefault(x => x > 3)).throws;
    });
});
