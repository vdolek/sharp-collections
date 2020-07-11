import { List } from '@src/internal';
import { expect } from 'chai';

describe('All tests', () => {
    it('True test', () => {
        const list = List.from(2, 4, 6);
        const value = list.all(x => x < 10);

        expect(value).to.be.true;
    });

    it('False test', () => {
        const list = List.from(2, 4, 6);
        const value = list.all(x => x < 5);

        expect(value).to.be.false;
    });

    it('True indexed test', () => {
        const list = List.from(2, 4, 6);
        const value = list.all((x, idx) => idx < 5);

        expect(value).to.be.true;
    });

    it('False indexed test', () => {
        const list = List.from(2, 4, 6);
        const value = list.all((x, idx) => idx < 1);

        expect(value).to.be.false;
    });
});
