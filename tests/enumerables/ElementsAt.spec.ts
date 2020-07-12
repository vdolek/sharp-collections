import { ElementsAtNotFoundBehavior, List } from '@sharp-collections';
import { expect } from 'chai';

describe('elementsAt tests', () => {
    it('elementsAt test', () => {
        const list = List.fromElements(0, 2, 4, 6, 8, 10, 12);

        expect(list.elementsAt([]).toArray()).to.be.deep.equal([]);
        expect(list.elementsAt([1, 4, 3]).toArray()).to.be.deep.equal([2, 8, 6]);
        expect(() => list.elementsAt([1, 4, 99, 3]).toArray()).throws(Error, 'Index was out of range');
        expect(() => list.elementsAt([1, 4, -99, 3]).toArray()).throws(Error, 'Index was out of range');
    });

    it('returnNull test', () => {
        const list = List.fromElements(0, 2, 4, 6, 8, 10, 12);

        expect(list.elementsAt([], ElementsAtNotFoundBehavior.returnNull).toArray()).to.be.deep.equal([]);
        expect(list.elementsAt([1, 4, 3], ElementsAtNotFoundBehavior.returnNull).toArray()).to.be.deep.equal([2, 8, 6]);
        expect(list.elementsAt([1, 4, 99, 3], ElementsAtNotFoundBehavior.returnNull).toArray()).to.be.deep.equal([2, 8, null, 6]);
        expect(list.elementsAt([1, 4, -99, 3], ElementsAtNotFoundBehavior.returnNull).toArray()).to.be.deep.equal([2, 8, null, 6]);
    });

    it('returnNull test', () => {
        const list = List.fromElements(0, 2, 4, 6, 8, 10, 12);

        expect(list.elementsAt([], ElementsAtNotFoundBehavior.ignore).toArray()).to.be.deep.equal([]);
        expect(list.elementsAt([1, 4, 3], ElementsAtNotFoundBehavior.ignore).toArray()).to.be.deep.equal([2, 8, 6]);
        expect(list.elementsAt([1, 4, 99, 3], ElementsAtNotFoundBehavior.ignore).toArray()).to.be.deep.equal([2, 8, 6]);
        expect(list.elementsAt([1, 4, -99, 3], ElementsAtNotFoundBehavior.ignore).toArray()).to.be.deep.equal([2, 8, 6]);
    });
});
