import { expect } from 'chai';

import { EqualityComparer, List } from '../../src/index';

describe('contains tests', () => {
    it('simple test', () => {
        const list = List.fromRest(2, 4, 6);

        expect(list.contains(3)).to.be.false;
        expect(list.contains(4)).to.be.true;
    });

    it('predicate comparer test', () => {
        const list = List.fromRest(2, 4, 6);
        const comparer = EqualityComparer.fromPredicate<number>((a, b) => a * 2 === b);

        expect(list.contains(3, comparer)).to.be.true;
        expect(list.contains(4, comparer)).to.be.false;
    });

    it('empty source test', () => {
        const list = List.empty<number>();

        expect(list.contains(1)).to.be.false;
    });
});
