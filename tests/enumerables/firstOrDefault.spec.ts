import { List } from '@src/internal';
import { expect } from 'chai';

describe('FirstOrDefault tests', () => {
    it('Simple test', () => {
        const list = new List([2, 4, 6]);
        const value = list.firstOrDefault();

        expect(value).to.be.equal(2);
    });

    it('Simple predicate test', () => {
        const list = new List([2, 4, 6]);
        const value = list.firstOrDefault(x => x > 3);

        expect(value).to.be.equal(4);
    });

    it('Empty source test', () => {
        const list = new List<number>([]);
        const value = list.firstOrDefault();

        expect(value).to.be.null;
    });

    it('Empty source predicate test', () => {
        const list = new List<number>([]);
        const value = list.firstOrDefault(x => x > 3);

        expect(value).to.be.null;
    });

    it('Empty source predicate test 2', () => {
        const list = new List<number>([2, 4, 6]);
        const value = list.firstOrDefault(x => x > 10);

        expect(value).to.be.null;
    });
});
