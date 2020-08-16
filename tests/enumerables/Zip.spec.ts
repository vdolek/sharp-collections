import { expect } from 'chai';

import { Enumerable, List, ZipElement } from '../../src/internal';

describe('zip tests', () => {
    it('simple test', () => {
        const list1 = List.fromElements(2, 4, 6);
        const list2 = Enumerable.fromElements(3, 5, 7);
        const zipped = list1.zip(list2);

        expect(zipped.toArray()).to.be.deep.equal([new ZipElement(2, 3), new ZipElement(4, 5), new ZipElement(6, 7)]);
    });

    it('longer first test', () => {
        const list1 = List.fromElements(2, 4, 6, 8);
        const list2 = Enumerable.fromElements(3, 5, 7);
        const zipped = list1.zip(list2);

        expect(zipped.toArray()).to.be.deep.equal([new ZipElement(2, 3), new ZipElement(4, 5), new ZipElement(6, 7)]);
    });

    it('longer second test', () => {
        const list1 = List.fromElements(2, 4, 6);
        const list2 = Enumerable.fromElements(3, 5, 7, 9);
        const zipped = list1.zip(list2);

        expect(zipped.toArray()).to.be.deep.equal([new ZipElement(2, 3), new ZipElement(4, 5), new ZipElement(6, 7)]);
    });

    it('second empty test', () => {
        const list1 = List.fromElements(2, 4, 6);
        const list2 = Enumerable.empty();
        const zipped = list1.zip(list2);

        expect(zipped.toArray()).to.be.empty;
    });
});
