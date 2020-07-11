import { List } from '@src/internal';
import { expect } from 'chai';

describe('LastOrDefault tests', () => {
    it('Simple test', () => {
        const list = List.from(2, 4, 6);
        const value = list.lastOrDefault();

        expect(value).to.be.equal(6);
    });

    it('Simple predicate test', () => {
        const list = List.from(2, 4, 6);
        const value = list.lastOrDefault(x => x < 5);

        expect(value).to.be.equal(4);
    });

    it('Empty source test', () => {
        const list = List.from<number>();
        const value = list.lastOrDefault();

        expect(value).to.be.null;
    });

    it('Empty source predicate test', () => {
        const list = List.from<number>();
        const value = list.lastOrDefault(x => x > 3);

        expect(value).to.be.null;
    });

    it('Empty source predicate test 2', () => {
        const list = List.from(2, 4, 6);
        const value = list.lastOrDefault(x => x > 10);

        expect(value).to.be.null;
    });
});
