import { List } from '@src/internal';
import { expect } from 'chai';

describe('FirstOrDefault tests', () => {
    it('Simple test', () => {
        const list = List.from(2, 4, 6);
        const value = list.firstOrDefault();

        expect(value).to.be.equal(2);
    });

    it('Simple predicate test', () => {
        const list = List.from(2, 4, 6);
        const value = list.firstOrDefault(x => x > 3);

        expect(value).to.be.equal(4);
    });

    it('Empty source test', () => {
        const list = List.from<number>();
        const value = list.firstOrDefault();

        expect(value).to.be.null;
    });

    it('Empty source predicate test', () => {
        const list = List.from<number>();
        const value = list.firstOrDefault(x => x > 3);

        expect(value).to.be.null;
    });

    it('Empty source predicate test 2', () => {
        const list = List.from(2, 4, 6);
        const value = list.firstOrDefault(x => x > 10);

        expect(value).to.be.null;
    });
});
