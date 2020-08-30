import { expect } from 'chai';

import { List } from '../../src/internal';

describe('any, no, empty tests', () => {
    it('empty list test', () => {
        const list = List.empty<number>();

        expect(list.isEmpty()).to.be.true;
        expect(list.any()).to.be.false;
        expect(list.any(x => x < 10)).to.be.false;
        expect(list.no()).to.be.true;
        expect(list.no(x => x < 10)).to.be.true;
    });

    it('list test', () => {
        const list = List.fromRest(2, 4, 6);

        expect(list.isEmpty()).to.be.false;
        expect(list.any()).to.be.true;
        expect(list.any(x => x < 10)).to.be.true;
        expect(list.any(x => x > 10)).to.be.false;
        expect(list.no()).to.be.false;
        expect(list.no(x => x < 10)).to.be.false;
        expect(list.no(x => x > 10)).to.be.true;
    });
});
