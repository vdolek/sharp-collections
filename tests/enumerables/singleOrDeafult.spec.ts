import { List } from '@src/internal';
import { expect } from 'chai';

describe('SingleOrDefault tests', () => {
    it('Simple test', () => {
        const list = new List([2]);
        const value = list.singleOrDefault();

        expect(value).to.be.equal(2);
    });

    it('Simple predicate test', () => {
        const list = new List([2, 4, 6]);
        const value = list.singleOrDefault(x => x > 5);

        expect(value).to.be.equal(6);
    });

    it('Empty source test', () => {
        const list = new List<number>([]);
        const value = list.singleOrDefault();

        expect(value).to.be.null;
    });

    it('Empty source predicate test', () => {
        const list = new List<number>([]);
        const value = list.singleOrDefault(x => x > 3);

        expect(value).to.be.null;
    });

    it('Empty source predicate test 2', () => {
        const list = new List<number>([2, 4, 6]);
        const value = list.singleOrDefault(x => x > 10);

        expect(value).to.be.null;
    });

    it('Multiple test', () => {
        const list = new List<number>([2, 4, 6]);

        expect(() => list.singleOrDefault()).throws;
    });

    it('Multiple predicate test', () => {
        const list = new List<number>([2, 4, 6]);

        expect(() => list.singleOrDefault(x => x > 3)).throws;
    });
});
