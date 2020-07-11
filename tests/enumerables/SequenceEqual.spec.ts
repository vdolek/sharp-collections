import { Enumerable, List } from '@src/Internal';
import { expect } from 'chai';

describe('SequenceEqual tests', () => {
    it('Simple test', () => {
        const list1 = List.from(2, 4, 6);
        const list2 = Enumerable.from(2, 4, 6);

        expect(list1.sequenceEqual(list2)).to.be.true;
    });

    it('Longer first test', () => {
        const list1 = List.from(2, 4, 6, 8);
        const list2 = Enumerable.from(2, 4, 6);

        expect(list1.sequenceEqual(list2)).to.be.false;
    });

    it('Longer second test', () => {
        const list1 = List.from(2, 4, 6);
        const list2 = Enumerable.from(2, 4, 6, 8);

        expect(list1.sequenceEqual(list2)).to.be.false;
    });

    it('Different test', () => {
        const list1 = List.from(2, 4, 6);
        const list2 = Enumerable.from(6, 4, 2);

        expect(list1.sequenceEqual(list2)).to.be.false;
    });
});
