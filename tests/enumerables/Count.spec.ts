import { Enumerable, List } from '../../src/internal';
import { expect } from 'chai';

describe('count tests', () => {
    it('enumerable simple test', () => {
        const list = Enumerable.fromElements(2, 4, 6);
        const count = list.count();

        expect(count).to.be.equal(3);
    });

    it('enumerable empty test', () => {
        const list = Enumerable.empty();
        const count = list.count();

        expect(count).to.be.equal(0);
    });

    it('list simple test', () => {
        const list = List.fromElements(2, 4, 6);
        const count = list.count();

        expect(count).to.be.equal(3);
    });

    it('list empty test', () => {
        const list = List.empty();
        const count = list.count();

        expect(count).to.be.equal(0);
    });
});
