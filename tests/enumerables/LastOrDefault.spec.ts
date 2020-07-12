import { List } from '@src/Internal';
import { expect } from 'chai';

describe('lastOrDefault tests', () => {
    it('simple test', () => {
        const list = List.fromElements(2, 4, 6);
        const value = list.lastOrDefault();

        expect(value).to.be.equal(6);
    });

    it('simple predicate test', () => {
        const list = List.fromElements(2, 4, 6);
        const value = list.lastOrDefault(x => x < 5);

        expect(value).to.be.equal(4);
    });

    it('empty source test', () => {
        const list = List.fromElements<number>();
        const value = list.lastOrDefault();

        expect(value).to.be.null;
    });

    it('empty source predicate test', () => {
        const list = List.fromElements<number>();
        const value = list.lastOrDefault(x => x > 3);

        expect(value).to.be.null;
    });

    it('empty source predicate test 2', () => {
        const list = List.fromElements(2, 4, 6);
        const value = list.lastOrDefault(x => x > 10);

        expect(value).to.be.null;
    });
});
