import { List } from '@src/Internal';
import { expect } from 'chai';

describe('Any, no, empty tests', () => {
    it('Empty list test', () => {
        const list = List.empty<number>();

        expect(list.empty()).to.be.true;
        expect(list.any()).to.be.false;
        expect(list.any(x => x < 10)).to.be.false;
        expect(list.no()).to.be.true;
        expect(list.no(x => x < 10)).to.be.true;
    });

    it('List test', () => {
        const list = List.from(2, 4, 6);

        expect(list.empty()).to.be.false;
        expect(list.any()).to.be.true;
        expect(list.any(x => x < 10)).to.be.true;
        expect(list.any(x => x > 10)).to.be.false;
        expect(list.no()).to.be.false;
        expect(list.no(x => x < 10)).to.be.false;
        expect(list.no(x => x > 10)).to.be.true;
    });
});
