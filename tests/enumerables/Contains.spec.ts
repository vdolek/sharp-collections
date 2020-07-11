import { EqualityComparer, List } from '@src/Internal';
import { expect } from 'chai';

describe('Contains tests', () => {
    it('Simple test', () => {
        const list = List.from(2, 4, 6);

        expect(list.contains(3)).to.be.false;
        expect(list.contains(4)).to.be.true;
    });

    it('Predicate comparer test', () => {
        const list = List.from(2, 4, 6);
        const comparer = EqualityComparer.from<number>((a, b) => a * 2 === b);

        expect(list.contains(3, comparer)).to.be.true;
        expect(list.contains(4, comparer)).to.be.false;
    });

    it('Empty source test', () => {
        const list = List.empty<number>();

        expect(list.contains(1)).to.be.false;
    });
});
