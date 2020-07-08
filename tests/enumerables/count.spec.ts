import { Enumerable, List } from '@src/internal';
import { expect } from 'chai';

describe('Count tests', () => {
    it('Enumerable simple test', () => {
        const list = Enumerable.from(2, 4, 6);
        const count = list.count();

        expect(count).to.be.equal(3);
    });

    it('Enumerable empty test', () => {
        const list = Enumerable.empty();
        const count = list.count();

        expect(count).to.be.equal(0);
    });

    it('List simple test', () => {
        const list = List.from(2, 4, 6);
        const count = list.count();

        expect(count).to.be.equal(3);
    });

    it('List empty test', () => {
        const list = List.empty();
        const count = list.count();

        expect(count).to.be.equal(0);
    });
});
