import { ZipElement } from '@src/collections/zipElement';
import { Enumerable, List } from '@src/internal';
import { expect } from 'chai';

describe('Zip tests', () => {
    it('Simple test', () => {
        const list1 = List.from(2, 4, 6);
        const list2 = Enumerable.from(3, 5, 7);
        const zipped = list1.zip(list2);

        expect(zipped.toArray()).to.be.deep.equal([new ZipElement(2, 3), new ZipElement(4, 5), new ZipElement(6, 7)]);
    });

    it('Longer first test', () => {
        const list1 = List.from(2, 4, 6, 8);
        const list2 = Enumerable.from(3, 5, 7);
        const zipped = list1.zip(list2);

        expect(zipped.toArray()).to.be.deep.equal([new ZipElement(2, 3), new ZipElement(4, 5), new ZipElement(6, 7)]);
    });

    it('Longer second test', () => {
        const list1 = List.from(2, 4, 6);
        const list2 = Enumerable.from(3, 5, 7, 9);
        const zipped = list1.zip(list2);

        expect(zipped.toArray()).to.be.deep.equal([new ZipElement(2, 3), new ZipElement(4, 5), new ZipElement(6, 7)]);
    });

    it('Second empty test', () => {
        const list1 = List.from(2, 4, 6);
        const list2 = Enumerable.empty();
        const zipped = list1.zip(list2);

        expect(zipped.toArray()).to.be.empty;
    });
});
