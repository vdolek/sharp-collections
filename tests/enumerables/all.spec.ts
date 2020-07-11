import { List } from '@src/internal';
import { expect } from 'chai';

describe('All tests', () => {
    it('True test', () => {
        const list = new List([2, 4, 6]);
        const value = list.all(x => x < 10);

        expect(value).to.be.true;
    });

    it('False test', () => {
        const list = new List([2, 4, 6]);
        const value = list.all(x => x < 5);

        expect(value).to.be.false;
    });

    it('True indexed test', () => {
        const list = new List([2, 4, 6]);
        const value = list.all((x: number, idx: number) => idx < 5);

        expect(value).to.be.true;
    });

    it('False indexed test', () => {
        const list = new List([2, 4, 6]);
        const value = list.all((x: number, idx: number) => idx < 1);

        expect(value).to.be.false;
    });
});
