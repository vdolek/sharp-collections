import { expect } from 'chai';

import { List } from '../../src/internal';

describe('all tests', () => {
    it('true test', () => {
        const list = List.fromRest(2, 4, 6);
        const value = list.all(x => x < 10);

        expect(value).to.be.true;
    });

    it('false test', () => {
        const list = List.fromRest(2, 4, 6);
        const value = list.all(x => x < 5);

        expect(value).to.be.false;
    });

    it('true indexed test', () => {
        const list = List.fromRest(2, 4, 6);
        const value = list.all((x, idx) => idx < 5);

        expect(value).to.be.true;
    });

    it('false indexed test', () => {
        const list = List.fromRest(2, 4, 6);
        const value = list.all((x, idx) => idx < 1);

        expect(value).to.be.false;
    });
});
